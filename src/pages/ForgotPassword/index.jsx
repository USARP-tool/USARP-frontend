import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import useModal from "../../hooks/useModal";

import Wrapper from "../../layouts/Wrapper/Wrapper";
import Modal from "../../layouts/Modal/Modal";

import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";

import { images } from "../../assets/images/images";

import styles from "./styles.module.scss";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { openModal, closeModal, modalProps } = useModal();
  const isModalOpen = modalProps.isOpen;

  const schema = useMemo(() => {
    return Yup.object().shape({
      email: Yup.string().email("email Invalido").required("email Requerido"),
    });
  }, []);

  const { control, handleSubmit, formState, reset } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const { errors, isValid } = formState;

  const handleSubmitForm = (data) => {
    openModal({
      type: "success",
      title: "E-mail enviado!",
      text: `Por favor, verifique o e-mail que enviamos para ${data.email}`,
    });
    reset();
  };

  return (
    <div className={styles.container}>
      {!isModalOpen && (
        <Wrapper>
          <figure>
            <img src={images.logo2} alt="logo USARP" style={{ width: "6rem" }} />
          </figure>
          <h1>Recuperar senha</h1>
          <p>
            Por favor, digite o e-mail da sua conta. Enviaremos um e-mail com instruções para você recuperar sua senha.
          </p>
          <form onSubmit={handleSubmit(handleSubmitForm)} noValidate>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={"email"}
                  type="email"
                  placeholder="exemplo@usarp.com"
                  required
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
            <div className={styles.buttonGroup}>
              <Button disabled={!isValid} type="submit">
                Continuar
              </Button>
              <Button variant="outlined" onClick={() => navigate("/login")}>
                Voltar
              </Button>
            </div>
          </form>
        </Wrapper>
      )}
      <Modal {...modalProps} onClose={closeModal} />
    </div>
  );
};

export default ForgotPassword;
