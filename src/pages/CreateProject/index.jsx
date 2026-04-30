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
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

import { config } from "../../utils/config";
import { useAuth } from "../../hooks/useAuth";

import { ROLE_IN_PROJECT, PROJECT_STATUS } from "../../data/constants";
import styles from "./styles.module.scss";
import Container from "../../layouts/Container/Container";

const CreateProject = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useAuth();

  const isEditMode = !!id;

  const [apiError, setApiError] = useState("");
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const schema = useMemo(
    () =>
      Yup.object().shape({
        projectName: Yup.string().required("Nome do Projeto é Obrigatório"),
        description: Yup.string().optional(),
        status: isEditMode
          ? Yup.string().required("Status é obrigatório")
          : Yup.string().optional(),
        projectTeam: Yup.array().of(
          Yup.object().shape({
            email: Yup.string()
              .email("Digite um Email Valido")
              .required("Email é Obrigatório"),
            roleInProject: Yup.string().required(
              "O Nivel de Acesso é Obrigatório"
            ),
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
      projectTeam: [{ email: "", roleInProject: "", memberId: null }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projectTeam",
  });

  const { errors, isValid, isSubmitting } = formState;

  useEffect(() => {
    if (!isEditMode || !token) return;

    const fetchProjectData = async () => {
      setIsLoadingData(true);

      try {
        const response = await axios.get(
          `${config.baseUrl}/project/owned-projects`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const project = (response.data.projects || []).find(
          (p) => String(p.id) === String(id)
        );

        if (!project) {
          setApiError("Projeto não encontrado.");
          return;
        }

        reset({
          projectName: project.projectName,
          description: project.description,
          status: project.status,
          projectTeam: project.projectTeam?.length
            ? project.projectTeam.map((m) => ({
                email: m.email,
                roleInProject: m.roleInProject,
                memberId: m.memberId,
              }))
            : [{ email: "", roleInProject: "", memberId: null }],
        });
      } catch (error) {
        console.error(error);
        setApiError("Erro ao carregar dados.");
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchProjectData();
  }, [isEditMode, id, token, reset]);

  const updateRole = async (memberId, role) => {
    if (!memberId) return;

    try {
      await axios.put(
        `${config.baseUrl}/project/${id}/members/${memberId}`,
        { roleInProject: role },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch {
      alert("Erro ao atualizar papel");
    }
  };

  const handleSubmitForm = async (data) => {
    setApiError("");

    try {
      if (isEditMode) {
        await axios.put(
          `${config.baseUrl}/project/${id}`,
          {
            projectName: data.projectName,
            description: data.description,
            status: data.status,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        for (const member of data.projectTeam) {
          if (!member.memberId && member.email) {
            await axios.post(
              `${config.baseUrl}/project/${id}/addMember`,
              { memberEmail: member.email, 
                role: "Participante"

              },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
          }
        }
      } else {
        const { status, ...payload } = data;

        await axios.post(`${config.baseUrl}/project/create`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setShowSuccess(true);
    } catch (error) {
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);
      console.log("ERRO COMPLETO:", error);
      console.log(error.response?.data);
      setApiError(error.response?.data?.message || "Erro ao salvar projeto");
    }
  };

  const handleDeleteMember = async () => {
    if (!memberToDelete?.memberId) return;

    try {
      await axios.delete(
        `${config.baseUrl}/project/${id}/removeMember/${memberToDelete.memberId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMemberToDelete(null);
      window.location.reload();
    } catch {
      alert("Erro ao remover membro");
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
      {/* HEADER */}
      <div>
        <NavLink
          to="#"
          className={styles.header}
          onClick={(e) => {
            e.preventDefault();
            setShowExitModal(true);
          }}
        >
          <MoveLeft />
          <h2>{isEditMode ? "Editar Projeto" : "Novo Projeto"}</h2>
        </NavLink>
      </div>

      {/* ERROR */}
      {apiError && (
        <div className={styles.errorBox}>
          {apiError}
        </div>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit(handleSubmitForm)} noValidate>
        <fieldset>
          <legend>Dados Gerais</legend>

          <div className={styles.project}>
            <Controller
              name="projectName"
              control={control}
              render={({ field }) => (
                <Input {...field} label="Nome do Projeto" />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Input {...field} label="Descrição (Opcional)" />
              )}
            />

            {isEditMode && (
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Status"
                    options={PROJECT_STATUS}
                  />
                )}
              />
            )}
          </div>
        </fieldset>

        <fieldset>
          <legend>Equipe do projeto</legend>

          {fields.map((member, index) => (
            <div key={member.id} className={styles.members}>
              <Controller
                name={`projectTeam.${index}.email`}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Email"
                    disabled={isEditMode && !!member.memberId}
                  />
                )}
              />

              <Controller
                name={`projectTeam.${index}.roleInProject`}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Papel"
                    options={ROLE_IN_PROJECT}
                    onChange={(e) => {
                      field.onChange(e);
                      if (member.memberId) {
                        updateRole(member.memberId, e.target.value);
                      }
                    }}
                  />
                )}
              />

              <button
                type="button"
                onClick={() => {
                  if (isEditMode) {
                    setMemberToDelete(member);
                  } else {
                    remove(index);
                  }
                }}
              >
                <Trash2 />
              </button>
            </div>
          ))}
        </fieldset>

        {/* BUTTONS */}
        <div className={styles.buttonGroup}>
          <Button
            type="button"
            onClick={() =>
              append({ email: "", roleInProject: "", memberId: null })
            }
          >
            <Plus /> Novo Membro
          </Button>

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
              {isSubmitting
                ? "Salvando..."
                : isEditMode
                ? "Atualizar"
                : "Cadastrar"}
            </Button>
          </div>
        </div>
      </form>

      {/* MODAIS */}
      {showExitModal && (
        <ConfirmModal
          type="warning"
          title="Atenção!"
          message="Deseja sair sem salvar?"
          confirmText="Continuar aqui"
          cancelText="Sair"
          onConfirm={() => setShowExitModal(false)}
          onCancel={() => navigate("/projects")}
        />
      )}

      {memberToDelete && (
        <ConfirmModal
          type="warning"
          title="Remover membro?"
          message="Ele perderá acesso ao projeto."
          confirmText="Excluir"
          cancelText="Cancelar"
          onConfirm={handleDeleteMember}
          onCancel={() => setMemberToDelete(null)}
        />
      )}

      {showSuccess && (
        <ConfirmModal
          type="success"
          title="Sucesso!"
          message="Projeto salvo com sucesso!"
          confirmText="OK"
          onConfirm={() => {
            setShowSuccess(false);
            navigate("/projects");
          }}
        />
      )}
    </Container>
  );
};

export default CreateProject;