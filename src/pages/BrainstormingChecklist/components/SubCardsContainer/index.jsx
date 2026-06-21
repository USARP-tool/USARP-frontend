import { CardWithPostits } from "../CardWithPostits";
import styles from "./styles.module.scss";

export function SubCardsContainer({ selectedCardId }) {
  const getSubcards = () => {
    if (!selectedCardId) return [];

    const cardMap = {
      M1: [
        {
          id: "R1",
          category: "Status do Sistema",
          description:
            "Para cada user story que possa afetar o status do sistema, analise se a persona deseja que o sistema notifique sobre mudanças no status do sistema. Se sim, quais são?",
          context: "Os status do sistema que devem ser relatados são X, XI, XII.",
          type: "Requisitos",
        },
        {
          id: "R2",
          category: "Status do Sistema",
          description:
            "Para cada user story que possa afetar o status do sistema, analise se a persona deseja que o sistema notifique sobre mudanças no status do sistema. Se sim, quais são?",
          context: "Os status do sistema que devem ser relatados são X, XI, XII.",
          type: "Requisitos",
        },
        {
          id: "R3",
          category: "Status do Sistema",
          description:
            "Para cada user story que possa afetar o status do sistema, analise se a persona deseja que o sistema notifique sobre mudanças no status do sistema. Se sim, quais são?",
          context: "Os status do sistema que devem ser relatados são X, XI, XII.",
          type: "Requisitos",
        },
        {
          id: "P1",
          category: "Status do Sistema",
          description: "Como o status do sistema deve ser visualizado na interface?",
          context: "Crie um protótipo mostrando como o feedback de status será exibido ao usuário.",
          type: "Prototipação",
        },
      ],
      M2: [
        {
          id: "R2",
          category: "Interação do Usuário",
          description:
            "Para cada interação do usuário, o sistema deve confirmar que a ação foi registrada. Como essa confirmação deve ser comunicada?",
          context: "A confirmação deve ser clara e imediata, utilizando feedback visual e/ou auditivo.",
          type: "Requisitos",
        },
        {
          id: "P2",
          category: "Interação do Usuário",
          description: "Qual é a melhor forma de representar o feedback de interação?",
          context: "Protótipo de componentes que confirmam as ações do usuário.",
          type: "Prototipação",
        },
      ],
    };

    return cardMap[selectedCardId] || [];
  };

  const subcards = getSubcards();

  if (!selectedCardId || subcards.length === 0) {
    return null;
  }

  // Separate cards by type
  const requisitoCards = subcards.filter((card) => card.type === "Requisitos");
  const prototipacaoCards = subcards.filter((card) => card.type === "Prototipação");

  return (
    <div className={styles.subcards__wrapper}>
      {requisitoCards.length > 0 && (
        <div className={styles.column}>
          {requisitoCards.map((subcard) => (
            <CardWithPostits key={subcard.id} subcard={subcard} />
          ))}
        </div>
      )}
      {prototipacaoCards.length > 0 && (
        <div className={styles.column}>
          {prototipacaoCards.map((subcard) => (
            <CardWithPostits key={subcard.id} subcard={subcard} />
          ))}
        </div>
      )}
    </div>
  );
}
