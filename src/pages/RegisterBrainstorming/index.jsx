import { Button } from "../../components/Button";
import { Input } from "../../components/Input/indes";
import { IconChoice } from "../../utils/IconChoice";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";
import { InputCombobox } from "../../components/InputCombobox";
import RegisterBrainstormingService from "./registerBrainstorming.service";
import { config } from "../../utils/config";
import { FeedbackAlert } from "../../components/FeedbackAlert";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../hooks/useAlert";

export function RegisterBrainstorming() {
  const schema = Yup.object().shape({
    title: Yup.string()
      .required("Título do Brainstorming é um campo obrigatório!")
      .matches(/^[A-Za-z0-9 ]+$/, "O título deve conter apenas letras e números"),
    date: Yup.string()
      .required("Data e um campo obrigatório!")
      .test("future-date", "A data deve ser hoje ou no futuro", function (value) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Parse date string properly (YYYY-MM-DD)
        const [year, month, day] = value.split("-");
        const selectedDate = new Date(year, month - 1, day);
        selectedDate.setHours(0, 0, 0, 0);

        return selectedDate >= today;
      }),
    hours: Yup.string()
      .required("Horário é um campo obrigatório!")
      .test("future-time-today", "Se a data for hoje, o horário deve ser no futuro", function (value) {
        if (!value) return true;
        const date = this.parent.date;
        if (!date) return true;

        // Parse date string properly (YYYY-MM-DD)
        const [year, month, day] = date.split("-");
        const selectedDate = new Date(year, month - 1, day);
        selectedDate.setHours(0, 0, 0, 0);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Only validate time if date is today
        if (selectedDate.getTime() !== today.getTime()) {
          return true; // future or past date, any time is fine
        }

        // Date is today, check if time is in the future
        const [hour, minute] = value.split(":");
        const selectedTime = new Date();
        selectedTime.setHours(parseInt(hour), parseInt(minute));
        return selectedTime > new Date();
      }),
    project: Yup.string()
      .transform((value, originalValue) => {
        if (originalValue && typeof originalValue === "object") {
          return originalValue.label;
        }
        return value;
      })
      .required("O projeto é um campo obrigatório"),
    userStory: Yup.string()
      .transform((value, originalValue) => {
        if (Array.isArray(originalValue)) {
          return originalValue
            .map((item) => {
              if (typeof item === "object") {
                return item.label;
              }
              return item;
            })
            .join(", ");
        }
        return value;
      })
      .required("Histórias de Usuário é um campo obrigatório!"),
  });
  const {
    listProjects,
    listUserStoriesByProject,
    setProjectId,
    handleBackButton,
    RegisterBrainstorming,
    handleBackBackCloseALert,
  } = RegisterBrainstormingService(config.baseUrl);

  const {
    register,
    control,
    handleSubmit,
    getValues,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });
  const selectedProjectId = watch("project");
  const selectedDate = watch("date");
  const navigate = useNavigate();
  const { close } = useAlert();

  const handleSubmitForm = () => {
    const body = getValues();
    RegisterBrainstorming(body, contentSuccess, null, contentWarning);
  };

  useEffect(() => {
    if (selectedProjectId) {
      setProjectId(selectedProjectId.value);
    } else {
      setProjectId(null);
    }
  }, [selectedProjectId, setProjectId]);

  useEffect(() => {
    if (selectedDate) {
      trigger("hours");
    }
  }, [selectedDate, trigger]);

  const navegateBrainstorming = () => {
    close(null);
    navigate(`/brainstorming`, { replace: true });
  };

  // alertas
  const contentSuccess = (
    <FeedbackAlert.Root>
      <FeedbackAlert.Icon icon="checkcircle" />
      <FeedbackAlert.Title title="Excelente" />
      <FeedbackAlert.Description style={{ textAlign: "center" }} description="Novo Brainstorming registrado!" />
      <FeedbackAlert.Button onClick={() => navegateBrainstorming()} label="Visualizar" />
    </FeedbackAlert.Root>
  );
  const contentWarning = (
    <FeedbackAlert.Root>
      <FeedbackAlert.Icon icon="warningcircle" />
      <FeedbackAlert.Title title="Aviso!" />
      <FeedbackAlert.Description description="Ao sair da pagina as informações serão perdidas, deseja continuar?" />
      <div className={styles.alert__buttons}>
        <Button.Root data-type="danger" onClick={close}>
          <Button.Text>Cancelar</Button.Text>
        </Button.Root>
        <Button.Root data-type="primary" onClick={() => handleBackBackCloseALert()}>
          <Button.Text>Sim, continuar</Button.Text>
        </Button.Root>
      </div>
    </FeedbackAlert.Root>
  );

  return (
    <div className={styles.brainstorming__container}>
      <header>
        <span title="voltar">
          <IconChoice onClick={() => handleBackButton(watch(), contentWarning)} icon="back" />
          <h4>Novo Brainstorming</h4>
        </span>
      </header>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className={styles.generaldata__container}>
          <h4>Dados gerais</h4>
          <div className={styles.generaldata__input}>
            <fieldset>
              <h6>Título do Brainstorming</h6>
              <Input.Root
                {...register("title")}
                type="text"
                name="title"
                id="title"
                required={errors.title ? true : false}
              >
                {errors.title && <Input.Error>{errors.title.message}</Input.Error>}
              </Input.Root>
            </fieldset>
            <fieldset>
              <h6>Projeto</h6>
              <InputCombobox.Root>
                <InputCombobox.Select
                  name="project"
                  placeholder="Selecione o projeto"
                  error={errors.project}
                  control={control}
                  options={listProjects}
                />
                {errors.project && <InputCombobox.Error>{errors.project.message}</InputCombobox.Error>}
              </InputCombobox.Root>
            </fieldset>
            <fieldset>
              <h6>Data do Brainstorming</h6>
              <Input.Root
                {...register("date")}
                name="date"
                id="date"
                type="date"
                min={`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`}
                required={errors.date ? true : false}
              >
                {errors.date && <Input.Error>{errors.date.message}</Input.Error>}
              </Input.Root>
            </fieldset>
            <fieldset>
              <h6>Horário</h6>
              <Input.Root
                {...register("hours")}
                name="hours"
                id="hours"
                type="time"
                required={errors.hours ? true : false}
              >
                {errors.hours && <Input.Error>{errors.hours.message}</Input.Error>}
              </Input.Root>
            </fieldset>
          </div>
        </div>
        <div className={styles.selectUserStory__container}>
          <h4>Histórias de Usuário do Brainstorming</h4>
          <div>
            <fieldset>
              <InputCombobox.Root>
                <InputCombobox.MultiSelect
                  name="userStory"
                  placeholder="Selecione a História de Usuário"
                  defaultValue={[]}
                  error={errors.userStory}
                  control={control}
                  required={errors.userStory ? true : false}
                  options={listUserStoriesByProject}
                />
                {errors.userStory && <InputCombobox.Error>{errors.userStory.message}</InputCombobox.Error>}
              </InputCombobox.Root>
            </fieldset>
          </div>
        </div>
        <div className={styles.buttons__container}>
          <Button.Root type="button" onClick={() => handleBackButton(watch(), contentWarning)} data-type="secondary">
            <Button.Text>Cancelar</Button.Text>
          </Button.Root>
          <Button.Root disabled={!isValid} data-type="primary" type="submit">
            <Button.Text>Agendar Brainstorming</Button.Text>
          </Button.Root>
        </div>
      </form>
    </div>
  );
}
