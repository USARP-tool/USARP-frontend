import { IconChoice } from "../../utils/IconChoice";
import { MemberItem } from "./components/MemberItem";
import { Button } from "../../components/Button";
import { FeedbackAlert } from "../../components/FeedbackAlert";
import { useAlert } from "../../hooks/useAlert";
import CardMeansurement from "./components/CardMeansurement";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DetailProjectService from "./detailProject.service";
import { formatDateToDDMMYYYY } from "../../utils/formatDate";

const primary = {
    color: "#662914",
    background: "#FFE1D6",
    border: `1px solid #FFC2AD`,
};
const secondary = {
    color: "#004548",
    background: "#CCEFF0",
    border: `1px solid #99DEE1`,
};
const tercery = {
    color: "#664F19",
    background: "#FFF3D9",
    border: `1px solid #FFE8B2`,
};

export function DetailProject() {
    const { id } = useParams();

    const DefaultStatus = {
        active: "Ativo",
        blocked: "Bloqueado",
        closed: "Concluído/Encerrado",
    };

    const { projects, setProjectId } = DetailProjectService("");

    const navigate = useNavigate();
    const { close } = useAlert();
    const [status, setStatus] = useState(DefaultStatus.active);
    const handlerStatus = (value) => {
        if (value != status && value != undefined) {
            setStatus(value);
        }
    };

    useEffect(() => {
        console.log("Project ID:", id);
        if (id) {
            setProjectId(id);
        }
    }, [id]);

    //TODO: implementar a lógica de permissão para perfil de Moderador
    // Temporariamente, a permissão está definida como true
    const permission = true;

    const contentWarningchangeStatusBlocked = (
        <FeedbackAlert.Root>
            <FeedbackAlert.Icon icon="warningcircle" />
            <FeedbackAlert.Title title="Atenção!" />
            <FeedbackAlert.Description
                description={`Ao mudar o status para <span>Bloqueado</span>, não será permitido vincular Brainstormings e Histórias de Usuário a esse projeto. Além disso, o Moderador ficará impossibilitado de Editar os dados do projeto.`}
            />
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "24px",
                }}
            >
                <Button.Root data-type="secondary" onClick={() => close(null)}>
                    <Button.Text>Cancelar</Button.Text>
                </Button.Root>
                <Button.Root data-type="primary" onClick={() => {}}>
                    <Button.Text>Alterar status do projeto</Button.Text>
                </Button.Root>
            </div>
        </FeedbackAlert.Root>
    );

    const contentWarningchangeStatusClosed = (
        <FeedbackAlert.Root>
            <FeedbackAlert.Icon icon="warningcircle" />
            <FeedbackAlert.Title title="Atenção!" />
            <FeedbackAlert.Description
                description={`Ao mudar o status para <span>Concluído/Encerrado</span>, não será permitido vincular Brainstormings e Histórias de Usuário a esse projeto, apenas será permitido a visualização dos mesmos.`}
            />
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "24px",
                }}
            >
                <Button.Root data-type="secondary" onClick={() => close(null)}>
                    <Button.Text>Cancelar</Button.Text>
                </Button.Root>
                <Button.Root data-type="primary" onClick={() => {}}>
                    <Button.Text>Alterar status do projeto</Button.Text>
                </Button.Root>
            </div>
        </FeedbackAlert.Root>
    );

    const contentWarningchangeStatusActive = (
        <FeedbackAlert.Root>
            <FeedbackAlert.Icon icon="checkcircle" />
            <FeedbackAlert.Title title="Status alterado!" />
            <FeedbackAlert.Description
                description={`O status do projeto foi alterado com sucesso de <span>Ativo</span> para <span>Concluído/Encerrado</span>.`}
            />
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "24px",
                }}
            >
                <Button.Root data-type="primary" onClick={() => close(null)}>
                    <Button.Text>Ok, fechar</Button.Text>
                </Button.Root>
            </div>
        </FeedbackAlert.Root>
    );

    const deleteProject = (projectId) => {
        //TODO: implementar a lógica de exclusão do projeto
        console.log("Deleting project with ID:", projectId);
    };
    const favoriteProject = (projectId) => {
        //TODO: implementar a lógica para favoritar o projeto
        console.log("Logica para favoritar projeto", projectId);
    };

    return (
        <div className={styles.detailProject}>
            <header>
                <span aria-labelledby="title" onClick={() => navigate(-1)}>
                    <IconChoice icon="back" />
                    <h6 id="title">Detalhes do projeto</h6>
                </span>
            </header>
            <main>
                <session className={styles.card}>
                    <div className={styles.card__header}>
                        <h5>{projects?.projectName || ""}</h5>
                        <div>
                            <span onClick={() => favoriteProject(projects?.id)} style={{ cursor: "pointer" }}>
                                <IconChoice icon="star" />
                            </span>

                            {permission && (
                                <span
                                    style={{ cursor: "pointer" }}
                                    onClick={() => navigate(`/editProject/${projects?.id}`)}
                                >
                                    <IconChoice icon="edit" />
                                </span>
                            )}
                            {permission && (
                                <span style={{ cursor: "pointer" }} onClick={() => deleteProject(projects?.id)}>
                                    <IconChoice icon="delete" />
                                </span>
                            )}
                        </div>
                    </div>
                    <hr />
                    <div className={styles.card__body}>
                        <div>
                            <h6>Descrição</h6>
                            <p>{projects?.description || ""}</p>
                        </div>
                        <div>
                            <h6>Data de criação</h6>
                            <p>{formatDateToDDMMYYYY(projects?.createdAt) || ""}</p>
                        </div>

                        <div>
                            <h6>Status</h6>
                        </div>
                        <div>
                            <h6>Dados do criador do projeto (Dono do projeto)</h6>
                            <MemberItem
                                key={projects?.creator?.id}
                                name={projects?.creator?.fullName}
                                icon="user01"
                                email={projects?.creator?.email}
                                organization={projects?.creator?.organization}
                                color="#664F19"
                            />
                        </div>
                        <div>
                            <h6>Membros</h6>
                            <li>
                                <ul>
                                    {projects?.projectTeam?.map((member, index) => (
                                        <MemberItem
                                            key={member.memberId || index}
                                            name={member.fullName}
                                            icon={
                                                member.roleInProject.toLowerCase() !== "moderador"
                                                    ? member.icon
                                                    : "user02"
                                            }
                                            email={member.email}
                                            organization={member.roleInProject}
                                        />
                                    ))}
                                </ul>
                            </li>
                        </div>
                    </div>
                </session>
                <session className={styles.meansurement}>
                    <CardMeansurement
                        icon={"statisticsLamp"}
                        button={"yellow"}
                        title={"Brainstormings"}
                        value={projects?.brainstormingsCount}
                        line={"#FFDC8C"}
                        color={"#997626"}
                        btnSeeAll={"/brainstorming"}
                        btnNew={"/registerBrainstorming"}
                    />
                    <CardMeansurement
                        icon={"statisticsUserStory"}
                        button={"red"}
                        title={"Histórias de Usuário"}
                        value={projects?.userStoriesCount}
                        line={"#FEA484"}
                        color={"#CB5228"}
                        btnSeeAll={"/userStories"}
                        btnNew={"/registerUserstory"}
                    />
                </session>
            </main>
        </div>
    );
}
