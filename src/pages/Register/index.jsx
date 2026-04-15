import { useMemo, useState } from "react";

import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import useModal from "../../hooks/useModal";
import { useRegister } from "../../hooks/useRegister";
import { formatDateToDMY } from "../../utils/formatDate";

import Wrapper from "../../layouts/Wrapper/Wrapper";
import Modal from "../../layouts/Modal/Modal";

import Link from "../../components/ui/Link/Link";
import FormStepper from "../../components/FormStepper/FormStepper";
import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";
import PwStrengthLevel from "../../components/PwStrengthLevel/PwStrengthLevel";
import InputDate from "../../components/ui/InputDate/InputDate";
import Select from "../../components/ui/Select/Select";

import { FORMSTEPS, GENDER, PROFILE } from "../../data/constants";

import { images } from "../../assets/images/images";

import styles from "./styles.module.scss";

const Register = () => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const { modalProps, openModal, closeModal } = useModal();
  const navigate = useNavigate();

  const schema = useMemo(
    () =>
      Yup.object().shape({
        email: Yup.string()
          .required("Email é obrigatório")
          .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "digite um email valido"),
        fullName: Yup.string().min(3, "nome muito curto").max(50, "nome muito grande").required("Nome é obrigatório"),
        password: Yup.string()
          .required("Senha é obrigatória")
          .min(8, "A senha deve ter no mínimo 8 caracteres")
          .max(15, "A senha deve ter no máximo 15 caracteres")
          .matches(/[a-z]/, "A senha deve conter ao menos 1 letra minúscula")
          .matches(/[A-Z]/, "A senha deve conter ao menos 1 letra maiúscula")
          .matches(/[0-9]/, "A senha deve conter ao menos 1 número")
          .matches(/[^a-zA-Z0-9]/, "A senha deve conter ao menos 1 caractere especial (ex: !@#$%)"),
        birthdate: Yup.date().required("Data de nascimento é obrigatória"),
        gender: Yup.string().required("Gênero é obrigatório"),
        profile: Yup.string().required("Perfil é obrigatório"),
        organization: Yup.string().max(100, "nome da organização muito grande"),
      }),
    [],
  );

  const { control, handleSubmit, formState, trigger, watch, reset } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      birthdate: null,
      gender: "",
      profile: "",
      organization: "",
    },
  });

  const { errors, isValid } = formState;
  const { register, isLoading: isRegistering } = useRegister();

  const password = watch("password");
  const nome = watch("fullName");
  const primeiroNome = nome ? nome.split(" ")[0] : "fulano(a)";

  const modalSuccess = useMemo(
    () => ({
      type: "success",
      text: "Sua conta foi criada com sucesso! Faça login para continuar.",
      buttonText: "Fazer Login",
      onButtonClick: () => navigate("/login"),
    }),
    [navigate]
  );

  const getErrorModalConfig = (error) => {
    const status = error?.response?.status;
    const data = error?.response?.data;

    // Erro 400 - Validação
    if (status === 400 && data?.errors) {
      const errorMessage = Array.isArray(data.errors) ? data.errors.join("\n") : "Verifique os dados informados.";

      return {
        type: "error",
        title: "Dados Inválidos",
        text: errorMessage,
        buttonText: "Ok, fechar",
        onButtonClick: () => closeModal(),
      };
    }

    // Erro 500 - Servidor
    if (status === 500) {
      return {
        type: "error",
        title: "Erro no Servidor",
        text: "Ocorreu um problema interno ao processar seu cadastro. Por favor, tente novamente mais tarde.",
        buttonText: "Ok, fechar",
        onButtonClick: () => closeModal(),
      };
    }

    return {
      type: "error",
      title: "Erro ao realizar Cadastro",
      text: `Falha na conexão ou erro desconhecido. Verifique sua internet.`,
      buttonText: "Ok, fechar",
      onButtonClick: () => closeModal(),
    };
  };

  const handleSubmitForm = async (data) => {
    const payload = {
      ...data,
      birthdate: formatDateToDMY(data.birthdate),
    };

    try {
      await register(payload);
      openModal(modalSuccess);
      reset();
    } catch (error) {
      const errorConfig = getErrorModalConfig(error);
      openModal(errorConfig);
    }
  };

  const handleNext = async () => {
    let fieldsToValidate = [];
    if (activeStep === 0) {
      fieldsToValidate = ["email", "fullName"];
    } else if (activeStep === 1) {
      fieldsToValidate = ["password"];
    }
    const isStepValid = await trigger(fieldsToValidate);

    if (isStepValid) {
      setActiveStep((prev) => (prev < 2 ? prev + 1 : prev));
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <div className={styles.container}>
      <Wrapper>
        <figure>
          <img src={images.logo2} alt="logo USARP" style={{ width: "5rem" }} />
        </figure>

        <div style={{ width: "100%" }}>
          <FormStepper activeStep={activeStep} steps={FORMSTEPS} />
        </div>

        <form onSubmit={handleSubmit(handleSubmitForm)} noValidate>
          {activeStep === 0 && (
            <>
              <p className={styles.infoText}>
                Comece um <span>brainstorming</span> em menos de <span>5 minutos</span> com o seu time!
              </p>
              <div className={styles.inputGrup}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Email"
                      type="email"
                      placeholder="exemplo@usarp.com"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
                <Controller
                  name="fullName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Nome Completo"
                      placeholder="Digite seu nome completo"
                      error={!!errors.fullName}
                      helperText={errors.fullName?.message}
                    />
                  )}
                />
              </div>
            </>
          )}

          {activeStep === 1 && (
            <>
              <p className={styles.infoText}>
                Muito bem, <span>{primeiroNome}</span>! Estamos quase lá, agora crie uma <span>senha</span> segura.
              </p>
              <div className={styles.inputGrup}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Senha"
                      type="password"
                      placeholder="Crie sua senha"
                      showPasswordToggle
                      error={!!errors.password}
                      helperText={errors.password?.message}
                    />
                  )}
                />
              </div>
              <PwStrengthLevel password={password || ""} />
            </>
          )}

          {activeStep === 2 && (
            <>
              <p className={styles.infoText}>
                Excelente, <span>{primeiroNome}</span>! Para concluirmos, informe os dados abaixo.
              </p>
              <div className={styles.dobGender}>
                <Controller
                  name="birthdate"
                  control={control}
                  render={({ field }) => (
                    <InputDate {...field} error={!!errors.birthdate} helperText={errors.birthdate?.message} required />
                  )}
                />
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Gênero"
                      error={!!errors.gender}
                      helperText={errors.gender?.message}
                      options={GENDER}
                      required
                    />
                  )}
                />
              </div>
              <div className={styles.inputGrup}>
                <Controller
                  name="profile"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Perfil"
                      error={!!errors.profile}
                      helperText={errors.profile?.message}
                      options={PROFILE}
                      required
                    />
                  )}
                />
                <Controller
                  name="organization"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Organização"
                      placeholder="Digite sua organização"
                      error={!!errors.organization}
                      helperText={errors.organization?.message}
                    />
                  )}
                />
              </div>
            </>
          )}

          <div className={styles.buttonGrup}>
            {activeStep < 2 ? (
              <Button type="button" onClick={handleNext}>
                Próximo
              </Button>
            ) : (
              <Button type="submit" disabled={isRegistering || !isValid}>
                Finalizar Cadastro
              </Button>
            )}

            {activeStep > 0 && (
              <Button variant="outlined" type="button" onClick={handleBack}>
                Voltar
              </Button>
            )}
          </div>

          <p className={styles.terms}>
            Ao criar uma conta, você concorda com os <Link to="/term">Termos e Condições</Link>.
          </p>
        </form>

        <div>
          <p>
            {t("possuiConta")} <Link to="/login">{t("cadastrarEntrar")}</Link>
          </p>
        </div>
        <Modal {...modalProps} onClose={closeModal} />
      </Wrapper>
    </div>
  );
};

export default Register;

