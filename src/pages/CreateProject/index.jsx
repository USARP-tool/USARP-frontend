import { useMemo, useState, useEffect } from "react";
import { MoveLeft, Plus, Trash2, CheckCircle } from "lucide-react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import Input from "../../components/ui/Input/Input";
import Select from "../../components/ui/Select/Select";
import Button from "../../components/ui/Button/Button";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

import { config } from "../../utils/config";
import { useAuth } from "../../hooks/useAuth";

import { ROLE_IN_PROJECT } from "../../data/constants";
import { PROJECT_STATUS } from "../../data/constants";
import styles from "./styles.module.scss";
import Container from "../../layouts/Container/Container";

const CreateProject = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useAuth();

  const isEditMode = !!id;

  const [apiError, setApiError] = useState("");
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState(null);
  const [initialValues, setInitialValues] = useState(null);
  const [successType, setSuccessType] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const schema = useMemo(
    () =>
      Yup.object().shape({
        projectName: Yup.string()
          .min(5, "O nome do projeto deve ter no mínimo 5 caracteres")
          .required("Nome do Projeto é Obrigatório"),
        description: Yup.string()
          .transform((value) => (typeof value === "string" && value.trim() === "" ? undefined : value))
          .notRequired()
          .min(5, "A descrição deve ter no mínimo 5 caracteres"),
        status: isEditMode ? Yup.string().required("Status é obrigatório") : Yup.string().optional(),
        projectTeam: Yup.array().of(
          Yup.object().shape({
            email: Yup.string().email("Digite um Email Valido").required("Email é Obrigatório"),
            roleInProject: Yup.string().required("O Nivel de Acesso é Obrigatório"),
          }),
        ),
      }),
    [isEditMode],
  );

  const { control, formState, handleSubmit, reset , watch } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      projectName: "",
      description: "",
      status: "",
      projectTeam: [{ email: "", roleInProject: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projectTeam",
  });

  const { errors, isValid, isSubmitting, isDirty } = formState;

  useEffect(() => {
    if (isEditMode && token) {
      const fetchProjectData = async () => {
        setIsLoadingData(true);

        try {
          const response = await axios.get(
            `${config.baseUrl}/project/owned-projects`,
            {
              headers: { Authorization: `Bearer ${token}` },
              params: { id },
            }
          );

          const projects = response.data.projects || [];

          if (projects.length === 0) {
            setApiError("Projeto não encontrado ou você não tem permissão.");
            return;
          }

          const project = projects[0];

          const formatted = {
            projectName: project.projectName,
            description: project.description,
            status: project.status,
            projectTeam: project.projectTeam.map((member) => ({
              memberId: member.memberId,
              email: member.email,
              roleInProject: member.roleInProject || "",
            })),
          };

          reset(formatted);
          setInitialValues(formatted);
        } catch (error) {
          console.error("Erro ao buscar dados do projeto", error);
          setApiError("Erro ao carregar dados do projeto.");
        } finally {
          setIsLoadingData(false);
        }
      };

      fetchProjectData();
    }
  }, [isEditMode, id, token, reset]);

  const handleSubmitForm = async (data) => {
    setApiError("");
    try {
      if (isEditMode) {
        const payload = {
          projectName: data.projectName,
          description: data.description ?? "",
          status: data.status,
          projectTeam: (data.projectTeam ?? []).map((member) => ({
            memberEmail: member.email,
            roleInProject: member.roleInProject,
          })),
        };
        console.log("PAYLOAD ENVIADO:", payload);

        await axios.put(`${config.baseUrl}/project/${id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      
        const current = data;
        const initial = initialValues;

        const statusChanged = current.status !== initial.status;

        const teamChanged = current.projectTeam?.some((member, index) => {
          const initialMember = initial.projectTeam?.[index];

          return (
            member.email !== initialMember?.email ||
            member.roleInProject !== initialMember?.roleInProject
          );
        });

      // MENSAGEM do modal
        if (statusChanged) {
          setSuccessType("status");
          if (data.status === "Ativo") {
            setSuccessMessage("Projeto ativado com sucesso!");
          } else if (data.status === "Bloqueado") {
            setSuccessMessage("Projeto bloqueado com sucesso!");
          } else if (data.status === "Concluído/Encerrado") {
            setSuccessMessage("Projeto encerrado com sucesso!");
          } else {
            setSuccessMessage("Status atualizado com sucesso!");
          }
        } 
        else if (teamChanged) {
          setSuccessType("team");
          setSuccessMessage("Equipe do projeto atualizada com sucesso!");
        } 
        else {
          setSuccessType("general")
          setSuccessMessage("Projeto atualizado com sucesso!");
        }
        } else {
          const createPayload = {
            projectName: data.projectName,
            description: data.description ?? "",
            projectTeam: (data.projectTeam ?? []).map((member) => ({
              email: member.email,
              roleInProject: member.roleInProject,
            })),
          };

          await axios.post(`${config.baseUrl}/project/create`, createPayload, {
            headers: { Authorization: `Bearer ${token}` },
        });setSuccessMessage("Projeto salvo com sucesso!");
      }
      if (!isEditMode) {
       reset();
      }
    } catch (error) {
      console.error("Erro ao salvar projeto:", error);
      if (error.response) {
        setApiError(error.response.data.message || "Erro ao salvar.");
        if (error.response.data.errors) {
          setApiError(error.response.data.errors.join(", "));
        }
      } else {
        setApiError("Erro de conexão com o servidor.");
      }
    }
  };
  const handleDeleteMember = async (index, member) => {
    try {
      await axios.delete(
        `${config.baseUrl}/project/${id}/removeMember/${member.memberId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      remove(index); // só remove do form depois que o backend confirmar
    } catch (error) {
      console.error("Erro ao deletar membro:", error);
      setApiError("Erro ao remover membro do projeto.");
    }
  };
  if (isLoadingData) {
    return (
      <Container>
        <p>Carregando dados do projeto...</p>
      </Container>
    );
  }
const watchedProjectTeam = watch("projectTeam");
  return (
    <Container>
      <div>
        <NavLink to="/projects" className={styles.header}>
          <MoveLeft />
          <h2>{isEditMode ? "Editar Projeto" : "Novo Projeto"}</h2>
        </NavLink>
      </div>

      {apiError && (
        <div
          style={{
            padding: "1rem",
            marginBottom: "1rem",
            backgroundColor: "#fee2e2",
            color: "#b91c1c",
            borderRadius: "8px",
          }}
        >
          {apiError}
        </div>
      )}{successMessage && (
          <ConfirmModal
            type="success"
            title="Sucesso!"
            message={successMessage}
            onConfirm={() => {
              setSuccessMessage("");
              setSuccessType("");
              navigate("/projects");
            }}
          />
        )}
      <form onSubmit={handleSubmit(handleSubmitForm)} noValidate>
        <fieldset>
          <legend>Dados Gerais</legend>
          <div className={styles.project}>
            <Controller
              name="projectName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Nome do Projeto"
                  placeholder="Digite o Nome do Seu Projeto"
                  required
                  error={!!errors.projectName}
                  helperText={errors.projectName?.message}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Descrição do Projeto (Opcional)"
                  placeholder="Pequena descrição do projeto"
                  multiline={true}
                  rows={3}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />

            {isEditMode && (
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Status do Projeto"
                    options={PROJECT_STATUS}
                    required
                    error={!!errors.status}
                    helperText={errors.status?.message}
                    placeholder="Selecione o status"
                  />
                )}
              />
            )}
          </div>
        </fieldset>

        <fieldset>
          <legend>Equipe do projeto</legend>

          {fields.map((field, index) => (
            <div key={field.id} className={styles.members}>
              <div className={styles.emailInputWrapper}>
                <Controller
                  name={`projectTeam.${index}.email`}
                  control={control}
                  render={({ field: inputField }) => (
                    <Input
                      {...inputField}
                      label="E-mail do membro"
                      type="email"
                      placeholder="exemplo@email.com"
                      error={!!errors.projectTeam?.[index]?.email}
                      helperText={errors.projectTeam?.[index]?.email?.message}
                      required={!isEditMode}
                    />
                  )}
                />
              </div>

              <div className={styles.roleSelectWrapper}>
                <Controller
                  name={`projectTeam.${index}.roleInProject`}
                  control={control}
                  render={({ field: inputField }) => (
                    <Select
                      {...inputField}
                      label="Papel dentro do projeto"
                      error={!!errors.projectTeam?.[index]?.roleInProject}
                      helperText={errors.projectTeam?.[index]?.roleInProject?.message}
                      options={ROLE_IN_PROJECT}
                      required={!isEditMode}
                      placeholder="Selecione"
                    />
                  )}
                />
              </div>

              {fields.length > 0 && (
                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={() =>{
                    if (!isEditMode){
                      remove(index);
                      return;
                    }
              
                    setConfirmConfig({
                      title: "Remover membro",
                      message: "Tem certeza que deseja remover este membro?",
                      onConfirm: () =>
                        handleDeleteMember(index, watchedProjectTeam[index]),
                    });
                  }}
                >
                  <Trash2 />
                </button>
              )}
            </div>
          ))}
        </fieldset>

        <div className={styles.buttonGroup}>
          <div>
            <Button
              type="button"
              icon={<Plus />}
              iconPosition="start"
              onClick={() => append({ email: "", roleInProject: "" })}
            >
              Novo Membro
            </Button>
          </div>

          <div className={styles.actions}>
            <Button
              type="button"
              variant="outlined"
              onClick={() => {
                if (isDirty) {
                  setConfirmConfig({
                    title: "Tem certeza?",
                    message: "Você tem alterações não salvas. Deseja realmente sair?",
                    onConfirm: () => navigate("/projects"),
                  });
                } else {
                  navigate("/projects");
                }
              }}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>

            <Button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? "Salvando..." : isEditMode ? "Salvar Atualização" : "Cadastrar"}
            </Button>
          </div>
        </div>
      </form>
       {confirmConfig && (
          <ConfirmModal
            type="warning"
            title={confirmConfig.title}
            message={confirmConfig.message}
            onCancel={() => setConfirmConfig(null)}
            onConfirm={() => {
              confirmConfig.onConfirm?.();
              setConfirmConfig(null);
            }}
          />
        )}
    </Container>
  );
};

export default CreateProject;
