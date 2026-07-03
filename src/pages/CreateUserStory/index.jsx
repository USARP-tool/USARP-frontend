import { useEffect, useState, useMemo } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { MoveLeft, HelpCircle, Plus } from "lucide-react";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import Container from "../../layouts/Container/Container";
import Input from "../../components/ui/Input/Input";
import Select from "../../components/ui/Select/Select";
import Button from "../../components/ui/Button/Button";

import { useAuth } from "../../hooks/useAuth";
import { config } from "../../utils/config";
import { USERSTORY_TEMPLATE } from "../../data/constants";

import styles from "./styles.module.scss";

const CreateUserStory = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [projectsList, setProjectsList] = useState([]);
  const [apiError, setApiError] = useState("");

  const schema = useMemo(
    () =>
      Yup.object().shape({
        projectId: Yup.string().required("O projeto é um campo obrigatório caso não selecione um projeto"),
        userStorieNumber: Yup.string().required("O número é obrigatório"),
        userStoriesTitle: Yup.string().required("O Título da US é um campo obrigatório!"),
        card: Yup.string().required("O campo Cartão é obrigatório!"),
        conversation: Yup.string().required("O campo Conversa é obrigatório!"),
        confirmation: Yup.string().required("O campo Confirmação é obrigatório!"),
      }),
    [],
  );

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      projectId: projectId || "",
      userStorieNumber: "",
      userStoriesTitle: "",
      card: "",
      conversation: "",
      confirmation: "",
    },
  });

  const selectedProjectId = watch("projectId");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${config.baseUrl}/project/owned-projects`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data?.projects) {
          const options = response.data.projects.map((proj) => ({
            label: proj.projectName,
            value: proj.id,
          }));
          setProjectsList(options);
        }
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
      }
    };

    if (token) fetchProjects();
  }, [token]);

  useEffect(() => {
    if (!selectedProjectId) return;

    const fetchNextUserStoryNumber = async () => {
      try {
        const response = await axios.get(`${config.baseUrl}/userstories/${selectedProjectId}/user-stories`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { page: 1, pageSize: 1, sort: "desc" },
        });

        const stories = response.data?.userStories || [];
        let nextNumber = 1;

        if (stories.length > 0) {
          const maxNumber = parseInt(stories[0].userStorieNumber, 10) || 0;
          nextNumber = maxNumber + 1;
        }

        setValue("userStorieNumber", String(nextNumber).padStart(3, "0"), {
          shouldValidate: true,
        });
      } catch (error) {
        console.error("Erro ao buscar histórias de usuário:", error);
        setValue("userStorieNumber", "001", { shouldValidate: true });
      }
    };

    fetchNextUserStoryNumber();
  }, [selectedProjectId, token, setValue]);

  const handleInsertTemplate = (fieldKey) => {
    setValue(fieldKey, USERSTORY_TEMPLATE[fieldKey], {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const onSubmitForm = async (data, isContinuousCreation) => {
    setApiError("");
    try {
      const payload = {
        projectId: data.projectId,
        userStories: [
          {
            userStorieNumber: parseInt(data.userStorieNumber, 10),
            userStoriesTitle: data.userStoriesTitle,
            card: data.card,
            conversation: data.conversation,
            confirmation: data.confirmation,
          },
        ],
      };

      await axios.post(`${config.baseUrl}/userstories/register`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (isContinuousCreation) {
        const nextNum = parseInt(data.userStorieNumber, 10) + 1;

        reset({
          projectId: data.projectId,
          userStorieNumber: String(nextNum).padStart(3, "0"),
          userStoriesTitle: "",
          card: "",
          conversation: "",
          confirmation: "",
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate(`/project/${data.projectId}`);
      }
    } catch (error) {
      console.error("Erro ao cadastrar User Story:", error);
      if (error.response?.data?.message) {
        setApiError(error.response.data.message);
      } else {
        setApiError("Ocorreu um erro interno ao cadastrar a História de Usuário.");
      }
    }
  };

  return (
    <Container>
      <div className={styles.pageContainer}>
        <NavLink to={`/project/${projectId}`} className={styles.header}>
          <MoveLeft size={24} />
          <h2>Criar Histórias de Usuário</h2>
        </NavLink>

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

        <form className={styles.formWrapper} noValidate>
          <Controller
            name="projectId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Selecionar projeto"
                options={projectsList}
                error={!!errors.projectId}
                helperText={errors.projectId?.message}
              />
            )}
          />

          <div className={styles.row}>
            <Controller
              name="userStorieNumber"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Número da História de Usuário"
                  placeholder="001"
                  type="text"
                  error={!!errors.userStorieNumber}
                  helperText={errors.userStorieNumber?.message}
                />
              )}
            />

            <Controller
              name="userStoriesTitle"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Título da História de Usuário"
                  placeholder="Cadastro de usuário no sistema"
                  error={!!errors.userStoriesTitle}
                  helperText={errors.userStoriesTitle?.message}
                />
              )}
            />
          </div>

          <div className={styles.fieldWithAction}>
            <div className={styles.inputContainer}>
              <Controller
                name="card"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Cartão"
                    multiline
                    rows={4}
                    error={!!errors.card}
                    helperText={errors.card?.message}
                  />
                )}
              />
            </div>
            <button
              type="button"
              className={styles.helpBtn}
              onClick={() => handleInsertTemplate("card")}
              title="Preencher com Template"
            >
              <HelpCircle size={20} />
            </button>
          </div>

          <div className={styles.fieldWithAction}>
            <div className={styles.inputContainer}>
              <Controller
                name="conversation"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Conversa"
                    multiline
                    rows={5}
                    error={!!errors.conversation}
                    helperText={errors.conversation?.message}
                  />
                )}
              />
            </div>
            <button
              type="button"
              className={styles.helpBtn}
              onClick={() => handleInsertTemplate("conversation")}
              title="Preencher com Template"
            >
              <HelpCircle size={20} />
            </button>
          </div>

          <div className={styles.fieldWithAction}>
            <div className={styles.inputContainer}>
              <Controller
                name="confirmation"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Confirmação"
                    multiline
                    rows={5}
                    error={!!errors.confirmation}
                    helperText={errors.confirmation?.message}
                  />
                )}
              />
            </div>
            <button
              type="button"
              className={styles.helpBtn}
              onClick={() => handleInsertTemplate("confirmation")}
              title="Preencher com Template"
            >
              <HelpCircle size={20} />
            </button>
          </div>

          <div className={styles.footer}>
            <Button
              type="button"
              variant="outlined"
              icon={<Plus size={18} />}
              iconPosition="end"
              fullWidth={false}
              disabled={!isValid || isSubmitting}
              onClick={handleSubmit((data) => onSubmitForm(data, true))}
              sx={{
                borderColor: "var(--th-color-button)",
                color: "var(--th-color-button)",
                fontWeight: "bold",
              }}
            >
              Nova História de Usuário
            </Button>

            <div className={styles.footerRight}>
              <Button
                type="button"
                variant="outlined"
                fullWidth={false}
                onClick={() => navigate(`/project/${projectId}`)}
              >
                Cancelar
              </Button>

              <Button
                type="button"
                variant="contained"
                fullWidth={false}
                disabled={!isValid || isSubmitting}
                onClick={handleSubmit((data) => onSubmitForm(data, false))}
              >
                {isSubmitting ? "Cadastrando..." : "Cadastrar"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default CreateUserStory;
