import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Avatar } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import useModal from "../../hooks/useModal";

import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";
import Modal from "../../layouts/Modal/Modal";
import { config } from "../../utils/config";

import styles from "./styles.module.scss";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { modalProps, openModal, closeModal } = useModal();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user?.id) {
      axios
        .get(`${config.baseUrl}/user`, { params: { id: user.id } })
        .then((res) => setUserData(res.data))
        .catch((err) => console.error(err));
    }
  }, [user?.id]);

  const schema = Yup.object().shape({
    currentPassword: Yup.string().required("A senha atual é obrigatória!"),
    newPassword: Yup.string()
      .required("A nova senha é obrigatória!")
      .min(6, "A nova senha deve ter pelo menos 6 caracteres!")
      .notOneOf([Yup.ref("currentPassword")], "A nova senha não pode ser igual à senha atual!"),
    confirmNewPassword: Yup.string()
      .required("Confirme a nova senha!")
      .oneOf([Yup.ref("newPassword")], "As senhas não conferem!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    axios
      .put(`${config.baseUrl}/user/password-update`, data)
      .then(() => {
        openModal({
          type: "success",
          title: "Senha Atualizada!",
          text: "Sua senha foi alterada com sucesso.",
          buttonText: "Continuar",
          autoCloseDuration: 3000,
        });
        reset();
      })
      .catch((error) => {
        const status = error.response?.status;
        let errorMessage = "Ocorreu um erro inesperado. Tente novamente.";

        if (status === 400) {
          errorMessage = "Dados inválidos. Verifique as senhas informadas.";
        } else if (status === 401) {
          errorMessage = "Não autorizado. Faça login novamente.";
        } else if (status === 404) {
          errorMessage = "Usuário não encontrado.";
        } else if (status === 500) {
          errorMessage = "Erro interno no servidor. Tente novamente mais tarde.";
        }

        openModal({
          type: "error",
          title: "Erro ao atualizar",
          text: errorMessage,
          buttonText: "Tentar Novamente",
        });
      });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.userInfo}>
          <Avatar
            src={userData?.avatar}
            sx={{
              width: 60,
              height: 60,
              bgcolor: "var(--th-bigbutton-background)",
              color: "var(--th-bigbutton-text)",
            }}
          >
            {userData?.avatar
              ? userData.avatar
              : (userData?.fullName || user?.name || "U")?.substring(0, 2).toUpperCase()}
          </Avatar>
          <h2 className={styles.userName}>{userData?.fullName || user?.name || "Carregando..."}</h2>
        </div>
      </header>

      <hr className={styles.divider} />

      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContent}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Digite senha atual</label>
          <Input
            type="password"
            placeholder="Digite a senha atual"
            showPasswordToggle={true}
            error={!!errors.currentPassword}
            helperText={errors.currentPassword?.message}
            {...register("currentPassword")}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Nova senha</label>
          <Input
            type="password"
            placeholder="Digite a nova senha"
            showPasswordToggle={true}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
            {...register("newPassword")}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Confirme a senha</label>
          <Input
            type="password"
            placeholder="Repita a senha"
            showPasswordToggle={true}
            error={!!errors.confirmNewPassword}
            helperText={errors.confirmNewPassword?.message}
            {...register("confirmNewPassword")}
          />
        </div>

        <div className={styles.actionArea}>
          <Button
            variant="outlined"
            fullWidth={false}
            onClick={() => navigate(-1)}
            sx={{ minWidth: "140px" }}
          >
            Cancelar
          </Button>
          <Button type="submit" fullWidth={false} sx={{ minWidth: "140px" }}>
            Confirmar
          </Button>
        </div>
      </form>

      <Modal {...modalProps} onClose={closeModal} />
    </div>
  );
};

export default Index;
