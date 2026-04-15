import { useMemo } from "react";

import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import useModal from "../../hooks/useModal";

import Modal from "../../layouts/Modal/Modal";
import Wrapper from "../../layouts/Wrapper/Wrapper";

import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";
import PwStrengthLevel from "../../components/PwStrengthLevel/PwStrengthLevel";

import { images } from "../../assets/images/images";

import styles from "./styles.module.scss";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { openModal, closeModal, modalProps } = useModal();

  const schema = useMemo(
    () =>
      Yup.object().shape({
        senha: Yup.string()
          .required("Senha é obrigatória")
          .min(8, "A senha deve ter no mínimo 8 caracteres")
          .max(15, "A senha deve ter no máximo 15 caracteres")
          .matches(/[a-z]/, "A senha deve conter ao menos 1 letra minúscula")
          .matches(/[A-Z]/, "A senha deve conter ao menos 1 letra maiúscula")
          .matches(/[0-9]/, "A senha deve conter ao menos 1 número")
          .matches(/[^a-zA-Z0-9]/, "A senha deve conter ao menos 1 caractere especial (ex: !@#$%)"),
        senhaConfirm: Yup.string()
          .oneOf([Yup.ref("senha"), null], "As senhas devem corresponder")
          .required("Confirmação de senha é obrigatória"),
      }),
    []
  );

  const { control, handleSubmit, formState, watch, reset } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const { errors, isValid } = formState;

  const password = watch("senha", "");

  const handleSubmitForm = async (data) => {
    console.log(data);
    openModal({
      type: "success",
      title: "Senha redefinida!",
      text: "Sua senha foi redefinida com sucesso.",
      autoCloseDuration: 2000,
    });

    reset();

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <Wrapper>
        <figure>
          <img src={images.logo2} alt="logo USARP" style={{ width: "6rem" }} />
        </figure>
        <h1>Redefinição de senha</h1>
        <form onSubmit={handleSubmit(handleSubmitForm)} noValidate>
          <Controller
            name="senha"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                name="senha"
                label="Senha"
                type="password"
                placeholder="Digite sua nova senha"
                showPasswordToggle
                error={!!errors.senha}
                helperText={
                  errors.senha
                    ? errors.senha.message
                    : "Sua senha deve ter pelo menos 8 caracteres, com letras minúsculas e maiúsculas, números e caracteres especiais"
                }
              />
            )}
          />
          <Controller
            name="senhaConfirm"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                name="senhaConfirm"
                label="Confirmar senha"
                type="password"
                placeholder="Reescreva sua nova senha"
                showPasswordToggle
                error={!!errors.senhaConfirm}
                helperText={
                  errors.senhaConfirm ? errors.senhaConfirm.message : "Digite a mesma senha do campo anterior"
                }
              />
            )}
          />
          <div>
            <PwStrengthLevel password={password || ""} />
          </div>
          <div className={styles.buttonGroup}>
            <Button disabled={!isValid} type="submit">
              Continuar
            </Button>
            <Button variant="outlined" onClick={() => navigate("/login")}>
              Voltar
            </Button>
          </div>
        </form>
        <Modal {...modalProps} onClose={closeModal} />
      </Wrapper>
    </div>
  );
};

export default ResetPassword;
