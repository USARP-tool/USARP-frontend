import { useMemo, useState, useEffect } from "react";
import { MoveLeft, Plus, Trash2 } from "lucide-react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import Input from "../../components/ui/Input/Input";
import Select from "../../components/ui/Select/Select";
import Button from "../../components/ui/Button/Button";

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

  const schema = useMemo(
    () =>
      Yup.object().shape({
        projectName: Yup.string().required("Nome do Projeto é Obrigatório"),
        description: Yup.string().optional(),
        status: isEditMode ? Yup.string().required("Status é obrigatório") : Yup.string().optional(),
        projectTeam: Yup.array().of(
          Yup.object().shape({
            email: Yup.string().email("Digite um Email Valido").required("Email é Obrigatório"),
            roleInProject: Yup.string().required("O Nivel de Acesso é Obrigatório"),
          })
        ),
      }),
    [isEditMode]
  );

  const { control, formState, handleSubmit, reset } = useForm({
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

  const { errors, isValid, isSubmitting } = formState;

  useEffect(() => {
    if (isEditMode && token) {
      const fetchProjectData = async () => {
        setIsLoadingData(true);
        try {
          const response = await axios.get(`${config.baseUrl}/project/owned-projects`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { id: id },
          });

          const projects = response.data.projects || [];
          if (projects.length > 0) {
            const project = projects[0];
            reset({
              projectName: project.projectName,
              description: project.description,
              status: project.status,
              projectTeam: project.projectTeam.map((member) => ({
                email: member.email,
                roleInProject: member.roleInProject || "",
              })),
            });
          } else {
            setApiError("Projeto não encontrado ou você não tem permissão.");
          }
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
        const updatePayload = {
          projectName: data.projectName,
          description: data.description,
          status: data.status,
        };
        await axios.put(`${config.baseUrl}/project/${id}`, updatePayload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        const { status, ...createPayload } = data;

        await axios.post(`${config.baseUrl}/project/create`, createPayload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      reset();
      navigate("/projects");
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

  if (isLoadingData) {
    return (
      <Container>
        <p>Carregando dados do projeto...</p>
      </Container>
    );
  }

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
          <legend>
            Equipe do projeto
          </legend>

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

              {!isEditMode && fields.length > 0 && (
                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={() => remove(index)}
                  title="Remover membro"
                >
                  <Trash2 />
                </button>
              )}
            </div>
          ))}
        </fieldset>

        <div className={styles.buttonGroup}>
          <div>
            {!isEditMode && (
              <Button
                type="button"
                icon={<Plus />}
                iconPosition="start"
                onClick={() => append({ email: "", roleInProject: "" })}
              >
                Novo Membro
              </Button>
            )}
          </div>

          <div className={styles.actions}>
            <Button
              type="reset"
              variant="outlined"
              onClick={() => {
                reset();
                navigate("/projects");
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
    </Container>
  );
};

export default CreateProject;
