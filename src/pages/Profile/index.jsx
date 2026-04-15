import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Avatar } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import useModal from "../../hooks/useModal";

import Button from "../../components/ui/Button/Button";
import Modal from "../../layouts/Modal/Modal";
import { config } from "../../utils/config";

import styles from "./styles.module.scss";

const Index = () => {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const { user } = useAuth();
  const fileInputRef = useRef(null);

  const { modalProps, openModal, closeModal } = useModal();

  const schema = Yup.object().shape({
    fullName: Yup.string().required("Nome Completo é um campo obrigatório!"),
    email: Yup.string().email("Deve ser um E-mail válido!").required("E-mail é um campo obrigatório!"),
    organization: Yup.string().required("Organização é um campo obrigatório!"),
  });

  const { register, handleSubmit, formState, reset } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const { errors } = formState;

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png"];
    const maxSize = 3 * 1024 * 1024; // 3MB

    if (!validTypes.includes(file.type)) {
      openModal({
        type: "warning",
        title: "Formato Inválido",
        text: "Apenas imagens JPEG e PNG são permitidas.",
        buttonText: "Entendi",
      });
      return;
    }

    if (file.size > maxSize) {
      openModal({
        type: "warning",
        title: "Arquivo muito grande",
        text: "O tamanho máximo permitido é de 3MB.",
        buttonText: "Entendi",
      });
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    axios
      .put(`${config.baseUrl}/user`, formData)
      .then((response) => {
        setUserData((prevData) => ({
          ...prevData,
          avatar: response.data.avatar,
        }));
        openModal({
          type: "success",
          title: "Avatar Atualizado",
          text: "Sua foto de perfil foi alterada com sucesso.",
          buttonText: "Continuar",
          autoCloseDuration: 3000,
        });
      })
      .catch((error) => {
        console.error("Erro ao fazer upload da imagem", error);
        openModal({
          type: "error",
          title: "Erro no Upload",
          text: "Não foi possível enviar a imagem. Tente novamente mais tarde.",
          buttonText: "Fechar",
        });
      });
  };

  const createDateFromString = (dateString) => {
    if (!dateString) return dateString;
    const [dia, mes, ano] = dateString.split("/");
    return `${ano}-${mes}-${dia}`;
  };

  useEffect(() => {
    axios
      .get(`${config.baseUrl}/user`, { params: { id: user.id } })
      .then((res) => {
        res.data.birthdate = createDateFromString(res.data.birthdate);
        setUserData(res.data);
        reset(res.data);
      })
      .catch((err) => {
        console.error(err);
        openModal({
          type: "error",
          title: "Erro de Conexão",
          text: "Não foi possível carregar os dados do usuário.",
          buttonText: "Fechar",
        });
      });
  }, [openModal, reset, user.id]);

  const onSubmit = (data) => {
    const formattedBirthdate = data.birthdate.split("-").reverse().join("/");
    axios
      .put(`${config.baseUrl}/user/update`, { ...data, birthdate: formattedBirthdate })
      .then((res) => {
        res.data.birthdate = createDateFromString(res.data.birthdate);
        setUserData(res.data);
        setEditMode(false);
        openModal({
          type: "success",
          title: "Dados Salvos!",
          text: "Suas informações foram atualizadas com sucesso.",
          buttonText: "Continuar",
          autoCloseDuration: 3000,
        });
      })
      .catch(() => {
        openModal({
          type: "error",
          title: "Erro ao Salvar",
          text: "Ocorreu um erro ao atualizar seus dados. Tente novamente.",
          buttonText: "Tentar Novamente",
        });
      });
  };

  if (!userData) return null;

  return (
    <div className={styles.profileContainer}>
      <header className={styles.header}>
        <div className={styles.userInfo}>
          <Avatar
            src={userData.avatar}
            sx={{
              width: 60,
              height: 60,
              bgcolor: "var(--th-bigbutton-background)",
              color: "var(--th-bigbutton-text)",
            }}
          >
            {userData.avatar ? userData.avatar : userData.fullName?.substring(0, 2).toUpperCase()}
          </Avatar>
          <h2 className={styles.userName}>{userData.fullName}</h2>
        </div>
        <input
          type="file"
          accept="image/jpeg, image/png"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleAvatarChange}
        />

        <Button
          variant="outlined"
          fullWidth={false}
          sx={{
            width: "max-content",
            whiteSpace: "nowrap",
          }}
          onClick={() => fileInputRef.current.click()}
        >
          Editar meu avatar
        </Button>
      </header>

      <hr className={styles.divider} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.infoGrid}>
          {/* E-mail */}
          <div className={styles.infoRow}>
            <label className={styles.label}>E-mail</label>
            {editMode ? (
              <input {...register("email")} className={errors.email ? styles.inputError : styles.input} />
            ) : (
              <span className={styles.value}>{userData.email}</span>
            )}
          </div>

          <div className={styles.infoRow}>
            <label className={styles.label}>Gênero</label>
            {editMode ? (
              <select {...register("gender")} className={styles.select}>
                <option value="Feminino">Feminino</option>
                <option value="Masculino">Masculino</option>
                <option value="Não binário">Não binário</option>
                <option value="Prefiro não informar">Prefiro não Informar</option>
              </select>
            ) : (
              <span className={styles.value}>{userData.gender}</span>
            )}
          </div>

          <div className={styles.infoRow}>
            <label className={styles.label}>Data de nascimento</label>
            {editMode ? (
              <input type="date" {...register("birthdate")} className={styles.input} />
            ) : (
              <span className={styles.value}>{userData.birthdate?.split("-").reverse().join("/")}</span>
            )}
          </div>

          <div className={styles.infoRow}>
            <label className={styles.label}>Perfil</label>
            {editMode ? (
              <select {...register("profile")} className={styles.select}>
                <option value="Estudante de Graduação">Estudante de Graduação</option>
                <option value="Estudante de Pós-Graduação">Estudante de Pós-Graduação</option>
                <option value="Professor">Professor</option>
                <option value="Profissional da Indústria">Profissional da Indústria</option>
                <option value="Outro">Outro</option>
              </select>
            ) : (
              <span className={styles.value}>{userData.profile}</span>
            )}
          </div>

          <div className={styles.infoRow}>
            <label className={styles.label}>Organização</label>
            {editMode ? (
              <input {...register("organization")} className={errors.organization ? styles.inputError : styles.input} />
            ) : (
              <span className={styles.value}>{userData.organization}</span>
            )}
          </div>
        </div>

        <div className={styles.actionArea}>
          {editMode ? (
            <div className={styles.editActions}>
              <Button variant="outlined" fullWidth={false} onClick={() => setEditMode(false)}>
                Cancelar
              </Button>
              <Button type="submit" fullWidth={false} sx={{ padding: "0.5rem 2rem" }}>
                Salvar
              </Button>
            </div>
          ) : (
            <Button onClick={() => setEditMode(true)} fullWidth={false} sx={{ width: "200px" }}>
              Editar dados
            </Button>
          )}
        </div>
      </form>
      <Modal {...modalProps} onClose={closeModal} />
    </div>
  );
};

export default Index;
