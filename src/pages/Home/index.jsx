import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { images } from "../../assets/images/images";

import ProfileDropdown from "../../components/ProfileDropdown/ProfileDropdown";
import { ActionCard } from "../../components/ActionCard/ActionCard";
import Link from "../../components/ui/Link/Link";

import styles from "./styles.module.scss";
import { config } from "../../utils/config";
import Container from "../../layouts/Container/Container";

const Home = () => {
  const { user, handleLogout, token } = useAuth();
  const navigate = useNavigate();

  const [recentBrainstorms, setRecentBrainstorms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasProject, setHasProject] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const fetchProjects = async () => {
    if (!user?.id || !token) return;

    try {
      const response = await axios.get(
        `${config.baseUrl}/project/owned-projects`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const projects = response.data.projects || [];
      setHasProject(projects.length > 0);
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
      setHasProject(false);
    }
  };

  useEffect(() => {
    const fetchRecentBrainstorms = async () => {
      if (!user?.id || !token) return;

      try {
        const url = `${config.baseUrl}/brainstorming/getAllUserBrainstormingsGrid/${user.id}?page=1&limit=4`;

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRecentBrainstorms(response.data.brainstormings || []);
      } catch (error) {
        if (error.response?.status === 401) {
          handleLogout();
        } else {
          console.error("Erro ao buscar brainstormings:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.id) {
      fetchRecentBrainstorms();
      fetchProjects();
    }
  }, [user?.id]);

  useEffect(() => {
    const handleProjectCreated = () => {
      fetchProjects();
    };

    window.addEventListener("project-created", handleProjectCreated);
    return () => {
      window.removeEventListener("project-created", handleProjectCreated);
    };
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <Container>
      <header className={styles.header}>
        <h1>
          Bem vindo(a), <span>{user.fullName}</span>
        </h1>
        <ProfileDropdown avatarUrl={user.avatar} />
      </header>

      <div className={styles.buttonGroup}>
        <ActionCard
          label="Novo Projeto"
          image={images.folder}
          alt="criar um novo projeto"
          variant="primary"
          onClick={() => navigate("/registerProject")}
        />

        <div
          style={{ position: "relative", display: "inline-block" }}
          onMouseEnter={() => !hasProject && setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <ActionCard
            label="Novo Brainstorm"
            image={images.lightBulb}
            alt="criar um novo brainstorming"
            variant="secondary"
            disabled={!hasProject}
            onClick={() => {
              if (hasProject) {
                navigate("/registerBrainstorming");
              }
            }}
          />

          {showTooltip && (
            <div
              style={{
                position: "absolute",
                top: "60px",
                left: "0",
                background: "#333",
                color: "#fff",
                padding: "8px 10px",
                borderRadius: "6px",
                fontSize: "12px",
                whiteSpace: "nowrap",
                zIndex: 10,
              }}
            >
              Você precisa criar um projeto antes!
            </div>
          )}
        </div>
      </div>

      <div className={styles.brainstormingGroup}>
        <p>Recentes</p>

        <div className={styles.gridContainer}>
          {isLoading ? (
            <p className={styles.loadingText}>Carregando...</p>
          ) : recentBrainstorms.length > 0 ? (
            <div className={styles.cardsList}>
              {recentBrainstorms.map((bs) => (
                <div
                  key={bs.id}
                  className={styles.miniCard}
                  onClick={() => navigate(`/brainstorming/${bs.id}`)}
                >
                  <div className={styles.cardHeader}>
                    <strong>{bs.brainstormingTitle}</strong>
                    <span className={styles.date}>
                      {formatDate(bs.brainstormingDate)}
                    </span>
                  </div>

                  <div className={styles.cardFooter}>
                    <span>{bs.brainstormingTime}</span>
                    <span className={styles.storiesCount}>
                      {bs.userStories?.length || 0} histórias
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.emptyMessage}>
              ainda não há nada aqui.{" "}
              <Link to="/registerProject" href="criar um novo projeto" bold>
                <span>Crie seu primeiro projeto agora!</span>
              </Link>
            </p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Home;