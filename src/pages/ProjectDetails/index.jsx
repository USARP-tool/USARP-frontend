import { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MoveLeft,
  Star,
  Pencil,
  Trash2,
  Lightbulb,
  MessageSquare,
  BrainCircuit,
  Code,
  Scale,
  Coffee,
  ShieldCheck,
  User,
} from "lucide-react";
import Container from "../../layouts/Container/Container";
import Button from "../../components/ui/Button/Button";
import styles from "./styles.module.scss";
import { config } from "../../utils/config";
import { useAuth } from "../../hooks/useAuth";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const projectId = id || "proj-uuid-1";

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${config.baseUrl}/projects-details`, {
          params: { id: projectId },
        });

        if (response.data?.projects?.length > 0) {
          // Garante que a propriedade isFavorite inicie como false se não vier da API
          setProject({ ...response.data.projects[0], isFavorite: false });
        } else if (Array.isArray(response.data) && response.data.length > 0) {
          setProject({ ...response.data[0], isFavorite: false });
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes do projeto:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getRoleIcon = (role, index) => {
    const icons = [
      <User key="user" />,
      <Code key="code" />,
      <Scale key="scale" />,
      <Coffee key="coffee" />,
      <ShieldCheck key="shield" />,
    ];
    return icons[index % icons.length];
  };

  // --- Funções de Ação ---

  const handleToggleFavorite = () => {
    setProject((prev) => ({ ...prev, isFavorite: !prev.isFavorite }));
    // Nota: Se houver uma rota de API para salvar o favorito, você pode chamar o axios aqui futuramente.
  };

  const handleEdit = () => {
    navigate(`/editProject/${project.id}`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este projeto? Essa ação não pode ser desfeita.",
    );

    if (!confirmDelete) return;

    try {
      setIsLoading(true);

      await axios.delete(`${config.baseUrl}/project/${project.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Projeto excluído com sucesso.");
      navigate("/projects"); // Redireciona de volta para a lista de projetos após excluir
    } catch (error) {
      console.error("Erro ao excluir projeto:", error);

      if (error.response) {
        const { status, data } = error.response;

        if (status === 400 && data.hasBrainstormings) {
          alert("Não é possível excluir: Existem brainstormings vinculados a este projeto.");
        } else if (status === 403) {
          alert("Permissão negada: Apenas o criador pode excluir o projeto.");
        } else if (status === 404) {
          alert("Projeto não encontrado. Ele pode já ter sido excluído.");
          navigate("/projects");
        } else {
          alert(data.message || "Erro ao excluir o projeto.");
        }
      } else {
        alert("Erro ao excluir o projeto.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // --- Renderização ---

  if (isLoading) {
    return (
      <Container>
        <div className={styles.loading}>Carregando detalhes do projeto...</div>
      </Container>
    );
  }

  if (!project) {
    return (
      <Container>
        <div className={styles.loading}>Projeto não encontrado.</div>
      </Container>
    );
  }

  return (
    <Container>
      <div className={styles.pageWrapper}>
        <NavLink to="/projects" className={styles.header}>
          <MoveLeft size={24} />
          <h2>Detalhes do projeto</h2>
        </NavLink>

        <div className={styles.contentGrid}>
          {/* Coluna Esquerda - Detalhes */}
          <div className={styles.mainCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.projectName}>{project.projectName}</h3>
              <div className={styles.actionIcons}>
                <button
                  className={styles.iconBtn}
                  style={{ color: "var(--tertiary-600)" }}
                  onClick={handleToggleFavorite}
                  title={project.isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                >
                  <Star size={20} fill={project.isFavorite ? "var(--tertiary-600)" : "none"} />
                </button>
                <button
                  className={styles.iconBtn}
                  style={{ color: "var(--primary-600)" }}
                  onClick={handleEdit}
                  title="Editar Projeto"
                >
                  <Pencil size={20} />
                </button>
                <button
                  className={styles.iconBtn}
                  style={{ color: "var(--error)" }}
                  onClick={handleDelete}
                  title="Excluir Projeto"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>

            <div className={styles.section}>
              <span className={styles.label}>Descrição</span>
              <p className={styles.descriptionText}>{project.description}</p>
            </div>

            <div className={styles.metaRow}>
              <div className={styles.metaItem}>
                <span className={styles.label}>Data de criação</span>
                <span className={styles.metaValue}>{formatDate(project.createdAt)}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.label}>Status</span>
                <span className={styles.statusBadge}>{project.status === "active" ? "Ativo" : project.status}</span>
              </div>
            </div>

            <div className={styles.section}>
              <span className={styles.label}>Dados do criador do projeto (Dono do projeto)</span>
              <div className={styles.userRow}>
                <div className={`${styles.avatar} ${styles.avatarCreator}`}>
                  <BrainCircuit size={20} />
                </div>
                <div className={styles.userInfo}>
                  <span className={styles.userName}>{project.creator?.fullName}</span>
                  <span className={styles.userEmail}>{project.creator?.email}</span>
                </div>
                {project.creator?.organization && (
                  <span className={styles.userRole}>{project.creator.organization}</span>
                )}
              </div>
            </div>

            <div className={styles.section}>
              <span className={styles.label}>Membros</span>
              <div className={styles.membersList}>
                {project.projectTeam?.map((member, index) => (
                  <div key={member.memberId} className={styles.userRow}>
                    <div className={`${styles.avatar} ${styles.avatarMember}`}>
                      {getRoleIcon(member.roleInProject, index)}
                    </div>
                    <div className={styles.userInfo}>
                      <span className={styles.userName}>{member.fullName}</span>
                      <span className={styles.userEmail}>{member.email}</span>
                    </div>
                    <span className={styles.userRole}>{member.roleInProject}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.sideCards}>
            <div className={styles.summaryCard}>
              <div className={styles.summaryHeader}>
                <div className={`${styles.iconWrapper} ${styles.iconYellow}`}>
                  <Lightbulb size={24} color="var(--tertiary-600)" />
                </div>
                <div className={styles.summaryData}>
                  <span className={styles.summaryCount}>{project.brainstormingsCount || 0}</span>
                  <span className={styles.summaryLabel}>Brainstormings</span>
                </div>
              </div>
              <div className={styles.cardActions}>
                <Button
                  variant="contained"
                  sx={{
                    background: "var(--tertiary-700)",
                    borderRadius: "20px",
                    "&:hover": { background: "var(--tertiary-800)" },
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Code size={16} /> Ver todos
                  </span>
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "var(--tertiary-700)",
                    color: "var(--tertiary-700)",
                    borderRadius: "20px",
                    "&:hover": { background: "var(--tertiary-100)" },
                  }}
                >
                  + Novo
                </Button>
              </div>
            </div>

            <div className={styles.summaryCard}>
              <div className={styles.summaryHeader}>
                <div className={`${styles.iconWrapper} ${styles.iconOrange}`}>
                  <MessageSquare size={24} color="var(--secondary-600)" />
                </div>
                <div className={styles.summaryData}>
                  <span className={styles.summaryCount}>{project.userStoriesCount || 0}</span>
                  <span className={styles.summaryLabel}>Histórias de Usuário</span>
                </div>
              </div>
              <div className={styles.cardActions}>
                <Button
                  variant="contained"
                  sx={{
                    background: "var(--secondary-600)",
                    borderRadius: "20px",
                    "&:hover": { background: "var(--secondary-700)" },
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Code size={16} /> Ver todos
                  </span>
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "var(--secondary-600)",
                    color: "var(--secondary-600)",
                    borderRadius: "20px",
                    "&:hover": { background: "var(--secondary-100)" },
                  }}
                >
                  + Novo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProjectDetails;
