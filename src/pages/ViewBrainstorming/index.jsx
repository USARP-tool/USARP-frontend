import { useEffect, useState } from "react";
import { Input } from "../../components/Input/indes";
import { IconChoice } from "../../utils/IconChoice";
import { api } from "../../utils/api";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../components/Modal";
import { Check, MoveLeft, AlertTriangle } from "lucide-react";

import styles from "./styles.module.scss";
import Container from "../../layouts/Container/Container";

export function ViewBrainstorming() {
  const [brainstormings, setBrainstormings] = useState([]);
  const [filteredBrainstormings, setFilteredBrainstormings] = useState([]);

  const { token, user } = useAuth();
  const isModerador = user?.role === "Moderador";
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrainstorming, setSelectedBrainstorming] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    async function fetchBrainstormings() {
      try {
        const { data } = await api.get(
          `/brainstorming/getAllUserBrainstormingsGrid/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBrainstormings(data.brainstormings || []);
        setFilteredBrainstormings(data.brainstormings || []);
      } catch (error) {
        console.log(error);
      }
    }

    if (token) fetchBrainstormings();
  }, [token]);

  function handleEditStatus(brainstorming) {
    setSelectedBrainstorming(brainstorming);
    setNewStatus(brainstorming.status);
    setIsModalOpen(true);
  }

  function handleViewBrainstorming(brainstorming) {
    if (brainstorming.status !== "Novo") return;
    navigate(`/brainstorming/${brainstorming.id}`);
  }

  async function updateStatus() {
    try {
      await api.patch(
        `/brainstorming/${selectedBrainstorming.id}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBrainstormings((prev) =>
        prev.map((b) =>
          b.id === selectedBrainstorming.id
            ? { ...b, status: newStatus }
            : b
        )
      );

      setFilteredBrainstormings((prev) =>
        prev.map((b) =>
          b.id === selectedBrainstorming.id
            ? { ...b, status: newStatus }
            : b
        )
      );

      setIsModalOpen(false);
      alert("Status atualizado com sucesso");
    } catch (error) {
      console.log(error);
      alert("Erro ao atualizar status");
    }
  }

  function filterByStatus(status) {
    if (status === "Todos") {
      setFilteredBrainstormings(brainstormings);
      return;
    }

    setFilteredBrainstormings(
      brainstormings.filter((b) => b.status === status)
    );
  }

  function sortByDate(type) {
    const sorted = [...brainstormings].sort((a, b) => {
      if (type === "recentes") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

    setFilteredBrainstormings(sorted);
  }

  function getCurrentDateFormatted(date) {
    return new Date(date).toLocaleDateString("pt-BR");
  }

  const modalMessages = {
    Ativo: {
      title: "Deseja ativar este brainstorming?",
      description: "Ao ativar, a sessão permitirá edições e vínculos de histórias de usuários.",
      warning: "Usuários poderão adicionar e editar user stories nesta sessão.",
    },
    Novo: {
      title: "Deseja iniciar este brainstorming?.",
      description: "Ao confirmar, o braisntorming ficará disponivel para edição e acompanhamento",
      warning: "O brainstorming poderá ser alterado normalmente após a ativação",
    },
    Bloqueado:{
      title: "Deseja bloquear este brainstorming?",
      description: "Ao confirmar, algumas ações poderão ficar indiponivel durante o bloqueio, ",
      warning: "Usuários poderão perder acesso a determinadas funcionalidades temorariamente",
    },
    "Concluído/Encerrado": {
      title: "Deseja concluir este brainstoring?",
      description: "Após concluir o brainstorming, a sessão será considerada finalizada.",
      warning: "Após o encerramento, não será possível editar informações desta sessão",
    },
  };
  const currentMessage =
    modalMessages[newStatus] ||
    modalMessages["Novo"];

    
  return (
    <Container>
        <header className={styles.header}>
          <div className={styles.headerTitle}>
            <span 
              title="Voltar"
              onClick={()=> navigate(-1)}
              className={styles.backButton}
            >
              <MoveLeft size={24} />
            </span>

            <h2>Brainstorming</h2>
          </div>
        <div className={styles.headerActions}>
          <Input.Root
            style={{ width: "30%" }}
            placeholder="Pesquisar brainstorming"
            type="search"
          />
        </div>
      </header>

      {/* BOTÕES DE FILTRO */}
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <button
            className={styles.filterButton} 
            onClick={() => filterByStatus("Todos")}
          >
            Todos
          </button>

          <button
            className={styles.filterButton}
            onClick={() =>
              filterByStatus("Concluído/Encerrado")
            }
          >
            Concluído
          </button>

          <button className={styles.filterButton}>
            Favoritos
          </button>

          <button 
            className={styles.filterButton}
            onClick={() => sortByDate("recentes")}>
            Data de criação
          </button>
        </div>
      </div>

      {/* TABELA */}
      <div className={styles.table}>
        <table>
          <thead>
            <tr>
              <th>NOME</th>
              <th>HORA AGENDADA</th>
              <th>DATA DA CRIAÇÃO</th>
              <th>STATUS</th>
              <th>HISTÓRIAS DE USUARIO</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {filteredBrainstormings.map((b) => {
              console.log(b);

              const canEditStatus =
                user?.role?.toLowerCase() === "moderador" ||
                b.creatorId === user.id;
              
              return(
                <tr key={b.id}>
                  <td>{b.brainstormingTitle}</td>
                  <td>{b.brainstormingTime}</td>
                  <td>{getCurrentDateFormatted(b.createdAt)}</td>
                  <td>
                      <div
                          className={`${styles.table__status} ${
                          b.status === "Novo"
                            ? styles.statusNovo
                            : b.status === "Bloqueado"
                            ? styles.statusBloqueado
                            : styles.statusConcluido
                        }`}
                      >
                        <span>{b.status}</span>
                      </div>
                  </td>
                  <td>{b.userStories?.length || 0}</td>
                  <td>
                    <div className={styles.table__buttons}>
                      <span
                        title={b.status !== "Novo" ? "Somente brainstorming Novo" : "Visualizar"}
                        className={b.status !== "Novo" ? styles.disabledAction : ""}
                        onClick={() => handleViewBrainstorming(b)}
                      >
                        <IconChoice icon="eyeOn" />
                      </span>

                      <span title="Favoritar">
                        <IconChoice icon="star" />
                      </span>

                      {canEditStatus && (        
                        <span 
                          title="Editar Status"
                          onClick={(e) =>{
                            e.stopPropagation();
                            handleEditStatus(b)
                          }}
                        >
                         <IconChoice icon="edit" />
                        </span>
                      )}
                      <span title="Deletar">
                        <IconChoice icon="delete" />
                      </span>

                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      <Modal.Root 
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      >
        <div className={styles.modalIcon}>
          <AlertTriangle size={52} />
        </div>
        <Modal.Text
          title={currentMessage.title}
          description={currentMessage.description}
        />
        <div className={styles.modalContent}>
          <label>Status do brainstorming</label>
          <select
            className={styles.statusSelect}
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <option value="Novo">Novo</option>
            <option value="Bloqueado">Bloqueado</option>
            <option value="Concluído/Encerrado">
              Concluído/Encerrado
            </option>
          </select>
        </div>
        <div className={styles.warningBox}>
          <p>
            <strong>Importante</strong>{" "}
            {currentMessage.warning}
          </p>
        </div>
        <Modal.Button
          secondaryButton={{
            label: "Cancelar",
            onClick: () =>{ 
              setNewStatus(selectedBrainstorming.status);
              setIsModalOpen(false);
            },
          }}
          primaryButton={{
            label: "Confirmar",
            onClick: updateStatus,
            
          }}
        />
      </Modal.Root>
    </Container>
  );
}