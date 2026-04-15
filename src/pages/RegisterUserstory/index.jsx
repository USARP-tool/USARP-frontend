import { Button } from "../../components/Button";
import { IconChoice } from "../../utils/IconChoice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import { Expansible } from "../../components/Expansible/indes";
import { InputCombobox } from "../../components/InputCombobox";
import { FeedbackAlert } from "../../components/FeedbackAlert";
import { useMemo } from "react";
import { UserStoryFormFields } from "./UserStoryFormFields";
import RegisterUserstoryService from "./registerUserstory.service";
import * as Yup from "yup";
import styles from "./styles.module.scss";
import { useAlert } from "../../hooks/useAlert";
import { useTranslation } from "react-i18next";
import { Toast } from "../../components/Toast";
import { useNavigate } from "react-router-dom";

export function RegisterUserstory() {
  const schema = Yup.object().shape({
    project: Yup.string()
      .transform((value, originalValue) => {
        if (originalValue && typeof originalValue === "object") {
          return originalValue.label;
        }
        return value;
      })
      .required("O projeto é um campo obrigatório"),
    userStory: Yup.array().of(
      Yup.object().shape({
        userStorieNumber: Yup.number()
          .typeError("O número da US deve ser um valor numérico.")
          .required("O número da US é um campo obrigatório!"),
        userStoriesTitle: Yup.string().required(
          "O Título da US é um campo obrigatório!"
        ),
        card: Yup.string().required("O campo Cartão é obrigatório!"),
        conversation: Yup.string().required("O campo Conversa é obrigatório!"),
        confirmation: Yup.string().required(
          "O campo Confirmação é obrigatório!"
        ),
      })
    ),
  });

  const {
    control,
    register,
    getValues,
    setValue,
    watch,
    trigger,
    clearErrors,
    formState: { errors},
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    delayError:1000,
    defaultValues: {
      project: "",
      userStory: [
        {
          userStorieNumber: null,
          userStoriesTitle: "",
          card: "",
          conversation: "",
          confirmation: "",
        },
      ],
    },
  });

    const { t } = useTranslation();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "userStory",
  });

  const handleSubmitForm = () => {
    const data = getValues(); 
    const completeUserStories = data.userStory.filter(
      (us) =>
        us.userStorieNumber &&
        us.userStoriesTitle &&
        us.card &&
        us.conversation &&
        us.confirmation
    );
    const body = {
      projectId: data.project.value,
      userStories: completeUserStories,
    };

    registerUserstory(body, contentSuccess, null, contentWarning);
  };

  const {
    projectList,
    handleBackButton,
    registerUserstory,
    handleBackBackCloseALert,
  } = RegisterUserstoryService();

  const handleAddNewStory = async () => {
    const lastIndex = fields.length - 1;
    const isLastStoryValid = await trigger(`userStory.${lastIndex}`);

    if (isLastStoryValid) {
      append({
        userStorieNumber: "",
        userStoriesTitle: "",
        card: "",
        conversation: "",
        confirmation: "",
      });
    }
  };

  const lastFieldIndex = fields.length - 1;
  const committedStories = fields.slice(0, lastFieldIndex);
  const activeStoryField = fields[lastFieldIndex];

  const projectValue = watch("project");
  const allWatchedStories = watch();

  const isSubmittable = useMemo(() => {
    const projectIsValid = !errors.project;
    const hasCommittedStories = committedStories.length > 0;
    if (!projectIsValid || !hasCommittedStories) {
      return false;
    }
    const committedStoriesHaveErrors = errors.userStory?.some(
      (error, index) => index < lastFieldIndex && error
    );

    return !committedStoriesHaveErrors;
  }, [errors, committedStories, lastFieldIndex]);

  const isValidNewStory = useMemo(() => {
    const projectSelected = !!projectValue;
    if (!projectSelected) return false;

    const activeStoryErrors = errors.userStory?.[lastFieldIndex];
    const hasNoErrors =
      !activeStoryErrors || Object.keys(activeStoryErrors).length === 0;

    const values = allWatchedStories.userStory?.[lastFieldIndex] || {};
    const isFilled = values && Object.values(values).every((value) => !!value);

    return hasNoErrors && isFilled;
  }, [errors, projectValue, lastFieldIndex, allWatchedStories]);

  const {open, close } = useAlert();
  const navigate = useNavigate();

  const closeToast = () => {
    clearErrors("userStory");
  };
  const closeModal = (index) => {
    remove(index);
    close(null);
  };
  const navegateSessionDetails = () => {
    navigate(`/DetailProject/${projectValue.value}`, { replace: true });
    close(null);
  };

  const removeUserStory = (item, index) => {
    open(contentWarningDelete(item.userStoriesTitle, index));
  };

  const contentSuccess = (
    <FeedbackAlert.Root>
      <FeedbackAlert.Icon icon="checkcircle" />
      <FeedbackAlert.Title title="Excelente!" />
      <FeedbackAlert.Description
        style={{ textAlign: "center" }}
        description="História(as) de Usuário criada(as) com sucesso"
      />
      <div className={styles.alert__buttons}>
        <Button.Root data-type="danger" onClick={() => close(null)}>
          <Button.Text>Cancelar</Button.Text>
        </Button.Root>
        <Button.Root data-type="primary" onClick={() => navegateSessionDetails()}>
          <Button.Text>Detalhes da sessão</Button.Text>
        </Button.Root>
      </div>
    </FeedbackAlert.Root>
  );
  const contentWarning = (
    <FeedbackAlert.Root>
      <FeedbackAlert.Icon icon="warningcircle" />
      <FeedbackAlert.Title title="Aviso!" />
      <FeedbackAlert.Description description="Ao sair da pagina as informações serão perdidas, deseja continuar?" />
      <div className={styles.alert__buttons}>
        <Button.Root data-type="secondary" onClick={() => close(null)}>
          <Button.Text>Cancelar</Button.Text>
        </Button.Root>
        <Button.Root
          data-type="primary"
          onClick={() => handleBackBackCloseALert()}
        >
          <Button.Text>Sim, continuar</Button.Text>
        </Button.Root>
      </div>
    </FeedbackAlert.Root>
  );
  const contentWarningDelete = (title, index) => (
    <FeedbackAlert.Root>
      <FeedbackAlert.Icon icon="warningcircle" />
      <FeedbackAlert.Title title="Atenção!" />
      <FeedbackAlert.Description
        description={`Você tem certeza que deseja deletar a ${title}?`}
      />
      <div className={styles.alert__buttons}>
        <Button.Root data-type="secondary" onClick={() => close(null)}>
          <Button.Text>Cancelar</Button.Text>
        </Button.Root>
        <Button.Root data-type="primary" onClick={() => closeModal(index)}>
          <Button.Text>Sim, Deletar</Button.Text>
        </Button.Root>
      </div>
    </FeedbackAlert.Root>
  );

  return (
    <div className={styles.registerUserstory__container}>
      <header>
        <span title="voltar">
          <IconChoice
            onClick={() => handleBackButton(watch(), contentWarning)}
            icon="back"
          />
          <h4>Criar Histórias de Usuário</h4>
        </span>
      </header>
      {errors.userStory && (
        <Toast
          style={{ marginBottom: "1rem", width: "100%" }}
          type={"error"}
          onClick={closeToast}
          message={t("Preencha os campos corretamente.")}
        >
          <IconChoice icon="close" />
        </Toast>
      )}
      <form>
        <div className={styles.generaldata__container}>
          <fieldset style={{ paddingBottom: "1.5rem" }}>
            <h6>Selecionar projeto</h6>
            <InputCombobox.Root>
              <InputCombobox.Select
                name={`project`}
                placeholder="Selecione um projeto"
                error={errors.project}
                control={control}
                options={projectList}
              />
              {errors.project && (
                <InputCombobox.Error>
                  {errors.project.message}
                </InputCombobox.Error>
              )}
            </InputCombobox.Root>
          </fieldset>
        </div>

        {committedStories.map((item, index) => {
          return (
            <Expansible.Root
              key={item.id}
              usNumber={watch(`userStory.${index}.userStorieNumber`)}
              close={() => removeUserStory(item, index)}
              startOpen={false}
            >
              <UserStoryFormFields
                index={index}
                register={register}
                errors={errors}
                control={control}
                setValue={setValue}
              />
            </Expansible.Root>
          );
        })}
        {activeStoryField && (
          <UserStoryFormFields
            key={activeStoryField.id}
            index={lastFieldIndex}
            register={register}
            errors={errors}
            control={control}
            setValue={setValue}
          />
        )}
      </form>
      <div className={styles.buttons__container}>
        <Button.Root
          type="button"
          data-type="primary"
          onClick={handleAddNewStory}
          disabled={!isValidNewStory}
        >
          <Button.Text>Nova História de Usuário</Button.Text>
          <Button.Icon iconName="plus" />
        </Button.Root>
        <div>
          <Button.Root
            type="button"
            onClick={() => handleBackButton(watch(), contentWarning)}
            data-type="secondary"
          >
            <Button.Text>Cancelar</Button.Text>
          </Button.Root>
          <Button.Root
            disabled={!isSubmittable}
            data-type="primary"
            type="button"
            onClick={handleSubmitForm}
          >
            <Button.Text>Cadastrar</Button.Text>
          </Button.Root>
        </div>
      </div>
    </div>
  );
}
