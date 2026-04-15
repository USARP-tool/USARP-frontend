import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import axios from "axios";

import Input from "../../components/ui/Input/Input";
import Button from "../../components/ui/Button/Button";
import ProjectTable from "../../components/ProjectTable/ProjectTable";

import styles from "./styles.module.scss";

import { config } from "../../utils/config";
import { useAuth } from "../../hooks/useAuth";
import Container from "../../layouts/Container/Container";

const Projects = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [filter, setFilter] = useState("Todos");
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchProjects = async (searchTerm = "") => {
    try {
      setIsLoading(true);

      const params = {
        limit: 20,
        offset: 0,
        orderDirection: "desc",
        orderBy: "createdAt",
      };

      if (searchTerm) {
        params.projectName = searchTerm;
      }

      const response = await axios.get(`${config.baseUrl}/project/owned-projects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: params,
      });

      const apiProjects = response.data.projects || [];

      const normalizedProjects = apiProjects.map((p) => ({
        id: p.id,
        name: p.projectName,
        date: p.createdAt,
        creator: p.creator ? p.creator.fullName : "Desconhecido",

        status: p.status,
        isFavorite: false,
        isHidden: false,
      }));

      setProjects(normalizedProjects);
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
      // Aqui você pode adicionar um toast/notificação de erro
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (token) {
        fetchProjects(search);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, token]);

  const handleToggleFavorite = (id) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) => (project.id === id ? { ...project, isFavorite: !project.isFavorite } : project))
    );
  };

  const handleHideProject = (id) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, isHidden: !p.isHidden } : p)));
  };

  const handleDeleteProject = async (id) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este projeto? Essa ação não pode ser desfeita."
    );

    if (!confirmDelete) return;

    try {
      setIsLoading(true);

      await axios.delete(`${config.baseUrl}/project/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProjects((prevProjects) => prevProjects.filter((p) => p.id !== id));

      alert("Projeto excluído com sucesso.");
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
          setProjects((prev) => prev.filter((p) => p.id !== id));
        } else {
          alert(data.message || "Erro ao excluir o projeto.");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      if (filter === "Ocultos") {
        return p.isHidden;
      }

      if (p.isHidden) return false;

      if (filter === "Todos") return true;
      if (filter === "Ativo") return p.status === "Ativo";
      if (filter === "Favoritos") return p.isFavorite;

      return true;
    });
  }, [projects, filter]);

  const filters = ["Todos", "Ativo", "Favoritos", "Ocultos"];

  return (
    <Container>
      <header>
        <h2>Projetos</h2>
        <div>
          <Input
            placeholder="Pesquisar Projetos"
            name="search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              className={`${styles.filterButton} ${filter === f ? styles.active : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <Button
          iconPosition="end"
          icon={<Plus size={18} />}
          onClick={() => navigate("/registerProject")}
          className={styles.newProject}
        >
          <p>Criar Projeto</p>
        </Button>
      </div>

      {isLoading ? (
        <div style={{ padding: "2rem", textAlign: "center" }}>Carregando projetos...</div>
      ) : (
        <ProjectTable
          rows={filteredProjects}
          onToggleFavorite={handleToggleFavorite}
          onHideProject={handleHideProject}
          onDeleteProject={handleDeleteProject}
          filter={filter}
        />
      )}
    </Container>
  );
};

export default Projects;
