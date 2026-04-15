import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import useModal from "../../hooks/useModal";
import Modal from "../Modal/Modal";

import Button from "../../components/ui/Button/Button";
import Navbar from "../Navbar";

import SidebarProfile from "../../components/SidebarProfile/SidebarProfile";
import DeleteAccount from "../../components/DeleteAccount/DeleteAccount";

import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import LockIcon from "@mui/icons-material/Lock";

import styles from "./styles.module.scss";

const ProfileLayout = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { modalProps, openModal, closeModal } = useModal();

  const handleInitiateDelete = () => {
    openModal({
      type: "warning",
      title: "Atenção!",
      text: "Você tem certeza que deseja apagar a sua conta? Excluindo a sua conta agora, você estará excluindo os seus projetos e os usuários vinculados a eles perderão o acesso.",
      buttonText: "Sim, continuar",
      onButtonClick: () => setIsDeleting(true),
    });
  };

  return (
    <>
      <main className={styles.Configuration}>
        <Navbar />
        <div className={styles.Configuration__BackLink}>
          <Link to="/">
            <img src="../src/assets/icons/backArrow.svg" alt="Voltar" />
            Voltar
          </Link>
        </div>

        <div className={styles.Configuration__Wrapper}>
          <aside className={styles.Configuration__Sidebar}>
            <SidebarProfile label="Configurações de perfil" link="./profile" icon={<SettingsIcon />} />
            <SidebarProfile label="Alterar Senha" link="./privacity" icon={<LockIcon />} />

            <Button
              className={styles.Configuration__Button}
              onClick={handleInitiateDelete}
              variant="text"
              fullWidth={true}
              icon={<DeleteIcon className="icon_delete" />}
              iconPosition="start"
              sx={{
                color: "#d32f2f",
                justifyContent: "flex-start",
                padding: "16px",
                border: "none",
                "&:hover": {
                  backgroundColor: "var(--th-button-sidebar-hover)",
                },
              }}
            >
              Excluir conta
            </Button>
          </aside>

          <div className={styles.Configuration__Content}>
            {isDeleting ? <DeleteAccount onCancel={() => setIsDeleting(false)} /> : <Outlet />}
          </div>
        </div>
      </main>

      <Modal {...modalProps} onClose={closeModal} />
    </>
  );
};

export default ProfileLayout;
