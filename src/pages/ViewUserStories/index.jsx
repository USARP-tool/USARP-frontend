import { useState, useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Input from "../../components/ui/Input/Input";
import Container from "../../layouts/Container/Container";

import { IconChoice } from "../../utils/IconChoice";
import { config } from "../../utils/config";
import { useAuth } from "../../hooks/useAuth";


import styles from "./styles.module.scss";
import { Button } from "../../components/Button";
import { MoveLeft } from "lucide-react";

export default function ViewUserStories() {

  const { projectId } = useParams();
  console.log(projectId);// retirar depois
  const { token } = useAuth();
  const navigate = useNavigate();


  const [filter, setFilter] = useState("Todos");
  const [search, setSearch] = useState("");
  const [userStories, setUserStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] =
    useState(5);

  const [selectedStory, setSelectedStory] =
    useState(null);

  const filters = [
    "Todos", 
    "Favoritos",
    "Recentes",
    "Status",
    "Data de criação",
  ];

  async function fetchUserStories() {
    try {
      setIsLoading(true);

      const response = await axios.get(
        `${config.baseUrl}/userstories/${projectId}/user-stories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const formattedUserStories = (
        response.data.userStories || []
      ).map((us) => {

        console.log(us);
        
        return{
        id: us.id,
        number: us.userStorieNumber,
        title: us.userStoriesTitle,
        status: us.status || "Novo",
        card: us.card || "-",
        conversation: us.conversation || "-",
        confirmation: us.confirmation || "-",
        isFavorite: false,
        createdAt: us.createdAt || new Date(),
        lastAccess: us.lastAccess || new Date(),
      }
    });

      setUserStories(formattedUserStories);
    } catch (error) { 
      console.error(error);
        setError("Erro ao buscar histórias de usuário");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (projectId && token) {
      fetchUserStories();
    }
  }, [projectId, token]);
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, search, userStories]);

  function handleOpenStory(story) {
    setSelectedStory(null);
    setTimeout(() => setSelectedStory(story), 0);
  }

  function handleCloseModal() {
    setSelectedStory(null);
  }

  const handleToggleFavorite = (id) => {
    setUserStories((prev) =>
      prev.map((us) =>
        us.id === id
          ? {
              ...us,
              isFavorite: !us.isFavorite,
            }
          : us
      )
    );
  };
  const orderedStories = useMemo(() => {
    return [...userStories].sort(
      (a, b) => a.id - b.id
    );
  }, [userStories]);
  const filteredUserStories = useMemo(() => {
    const matchesSearch = (us) =>
      us.title.toLowerCase().includes(search.toLowerCase()) ||
      String(us.number).includes(search);

    let filtered = [...orderedStories];

    switch (filter) {
      case "Favoritos":
        filtered = filtered.filter((us) => us.isFavorite );
      break;

      case "Recentes":
        filtered = filtered.sort(
          (a, b) => new Date(b.lastAccess) - new Date(a.lastAccess)
        );
        break;

      case "Status":
        filtered = filtered.sort((a, b) =>
          a.status.localeCompare(b.status)
        );
        break;

      case "Data de criação":
        filtered = filtered.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;

      default:
        break;
    }
      return filtered.filter(matchesSearch);
  }, [filter, search, orderedStories]);
  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredUserStories.length / itemsPerPage
    )
  );

  const paginatedUserStories =
    filteredUserStories.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

  return (
    <Container>
      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <span 
            title="Voltar"
            onClick={() => navigate(`/project/${projectId}`)}
            className={styles.backButton}
            >
              <MoveLeft size={24}/>
          </span>

          <h2>Histórias de Usuário</h2>
        </div>

        <div className={styles.headerActions}>
          <Input
            placeholder="Pesquisar histórias"
            name="search"
            type="search"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>
      </header>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              className={`${
                styles.filterButton
              } ${
                filter === f
                  ? styles.active
                  : ""
              }`}
              onClick={() => {
                setFilter(f);
                setCurrentPage(1);
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.table}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NOME</th>
              <th>STATUS</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="4">
                  Carregando histórias...
                </td>
              </tr>
            ) : paginatedUserStories.length >
              0 ? (
              paginatedUserStories.map((us) => (
                <tr
                  key={us.id}
                  onClick={() =>
                    handleOpenStory(us)
                  }
                  className={
                    styles.clickableRow
                  }
                >
                  <td>{us.number}</td>

                  <td>{us.title}</td>

                  <td>
                    <div
                      className={styles.status}
                    >
                      <span>{us.status}</span>
                    </div>
                  </td>

                  <td>
                    <div
                      className={
                        styles.table__buttons
                      }
                    >
                      <span
                        title="Visualizar"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenStory(us);
                        }}
                      >
                        <IconChoice icon="view" />
                      </span>

                      <span
                        title="Favoritar"
                        className={
                          us.isFavorite
                            ? styles.favoriteActive
                            : ""
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleFavorite(
                            us.id
                          );
                        }}
                      >
                        <IconChoice icon="star" />
                      </span>

                      <span 
                        title="Editar"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert("Funcionalidade em desenvolvimento");
                        }}
                      >
                        <IconChoice icon="edit" />
                      </span>

                      <span 
                        title="Deletar"
                        onClick={(e)=> {
                          e.stopPropagation();
                          alert("Funcionalidade em desenvolvimento");
                        }}>
                        <IconChoice icon="delete" />
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">
                  Nenhuma história de usuário
                  cadastrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <div className={styles.paginationLeft}>
          <span>Linhas por página:</span>

          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(
                Number(e.target.value)
              );

              setCurrentPage(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <div className={styles.paginationNumbers}>
          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((prev) => prev - 1)
            }
          >
            {"<"}
          </button>

          {Array.from(
            { length: totalPages },
            (_, index) => (
              <span
                key={index + 1}
                className={
                  currentPage === index + 1
                    ? styles.activePage
                    : ""
                }
                onClick={() =>
                  setCurrentPage(index + 1)
                }
              >
                {index + 1}
              </span>
            )
          )}

          <button
            disabled={
              currentPage === totalPages
            }
            onClick={() =>
              setCurrentPage((prev) => prev + 1)
            }
          >
            {">"}
          </button>
        </div>
      </div>

      {selectedStory && (
        <div
          className={styles.modalOverlay}
          onClick={handleCloseModal}
        >
          <div
            className={styles.modal}
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <div className={styles.modalHeader}>
              <h3>
                Detalhes da História
              </h3>

              <button
                aria-label="Fechar modal"
                onClick={handleCloseModal}
              >
                X
              </button>
            </div>

            <div className={styles.modalContent}>
              <p>
                <strong>Número:</strong>{" "}
                {selectedStory.number}
              </p>

              <p>
                <strong>Título:</strong>{" "}
                {selectedStory.title}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {selectedStory.status}
              </p>
              <p>
                <strong>Cartão:</strong>{" "}
                {selectedStory.card}
              </p>
              <p>
                <strong>Conversa:</strong>{" "}
                {selectedStory.conversation}
              </p>
              <p>
                <strong>Confirmação:</strong>{" "}
                {selectedStory.confirmation}
              </p>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}