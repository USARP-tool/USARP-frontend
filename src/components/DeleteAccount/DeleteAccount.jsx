import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import useModal from "../../hooks/useModal";
import Modal from "../../layouts/Modal/Modal";
import { config } from "../../utils/config";
import { useAuth } from "../../hooks/useAuth.jsx";

import styles from "./styles.module.scss";

const DeleteAccount = ({ onCancel }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const { modalProps, openModal, closeModal } = useModal();
  const { handleLogout } = useAuth();

  const handleConfirmDelete = () => {
    if (!password) {
      openModal({
        type: "warning",
        title: "Senha Obrigatória",
        text: "Por favor, informe a sua senha para confirmar a exclusão.",
        buttonText: "Entendi",
      });

      return;
    }

    axios
      .delete(`${config.baseUrl}/user/delete`, {
        data: { password },
      })
      .then(() => {
        openModal({
          type: "success",
          title: "Conta Excluída!",
          text: "Sua conta foi deletada com sucesso. Redirecionando...",
          autoCloseDuration: 3000,
          buttonText: "Voltar para Login",
          onButtonClick: () => {
            closeModal();
            handleLogout();
          },
          onClose: () => {
            handleLogout();
          },
        });
      })
      .catch((err) => {
        const status = err.response?.status;
        const serverMessage = err.response?.data?.message;

        let errorTitle = "Erro ao excluir conta";
        let errorMessage = serverMessage || "Ocorreu um erro interno. Tente novamente mais tarde.";

        if (status === 400) {
          errorMessage = "A senha informada está incorreta.";
        } else if (status === 403) {
          errorTitle = "Conta Bloqueada";
          errorMessage = "Você excedeu o limite de tentativas. Tente novamente após 24 horas.";
        } else if (status === 401) {
          errorMessage = "Sua sessão expirou. Faça login novamente.";
        } else if (status === 404) {
          errorMessage = "Usuário não encontrado.";
        }

        openModal({
          type: "error",
          title: errorTitle,
          text: errorMessage,
          buttonText: "Fechar",
        });

        setPassword("");
      });
  };

  return (
    <div className={styles.DeleteSection}>
      <h2 className={styles.DeleteTitle}>Excluir Conta</h2>
      <p className={styles.DeleteText}>Para prosseguir com a exclusão definitiva, confirme sua senha abaixo:</p>

      <input
        type="password"
        placeholder="Senha do perfil"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.PasswordInput}
        onPaste={(e) => {
          e.preventDefault();
          openModal({
            type: "warning",
            title: "Ação bloqueada",
            text: "Por segurança, não é permitido colar senhas.",
            buttonText: "Entendi",
          });
        }}
      />

      <div className={styles.DeleteActions}>
        <button onClick={onCancel} className={styles.CancelButton}>
          Cancelar
        </button>
        <button onClick={handleConfirmDelete} className={styles.ConfirmButton}>
          Confirmar exclusão
        </button>
      </div>

      <Modal {...modalProps} onClose={closeModal} />
    </div>
  );
};

DeleteAccount.propTypes = {
  onCancel: PropTypes.func.isRequired,
};

export default DeleteAccount;
