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
            "Para cada user story que possa gerar falhas no sistema, analise se a persona deseja que o sistema notifique essas falhas. Se sim, quais são?",
          context: "O sistema precisará fornecer feedback sobre as falhas I, II, III que ocorrem nessa user story.",
          type: "Requisitos",
        },
        {
          id: "P1",
          category: "Status do Sistema",
          description:
            "Quais informações sobre status do sistema são críticas para persona e não podem passar despercebidas?",
          context:
            "Para as informações destacadas, sugere-se que essas informações sejam exibidas no formato invasivo na área principal, no qual impede a persona de continuar até que as informações destacadas sejam fechadas.",
          type: "Prototipação",
        },
        {
          id: "P2",
          category: "Status do Sistema",
          description:
            "Quais informações sobre o status do sistema estão relacionadas a uma situação importante, mas não crítica?",
          context:
            "As informações relacionadas às falhas III, IV, etc, devem ser mostradas no formato destacado. Para essas informações, sugere-se que elas sejam destacadas, usando cores e sons ou movimentos diferentes, tamanhos, etc.",
          type: "Prototipação",
        },
        {
          id: "P3",
          category: "Status do Sistema",
          description: "Quais informações sobre o status do sistema será simplesmente exibida na área de status?",
          context:
            "Para as informações a serem mostradas na área de status, sugere-se que seja dado algum tipo de relevância na área de status do sistema.",
          type: "Prototipação",
        },
      ],
      M2: [
        {
          id: "R3",
          category: "Interação",
          description: "Para cada user story, analise como a persona poderá reconhecer o resultado de uma ação.",
          context:
            "O sistema responde a eventos de interação A, B e C. C tem alto significado. A resposta do sistema será feita em 0,1 milissegundos após a interação da persona. Em caso de sucesso, o sistema deve ..... em caso de insucesso, o sistema deve...",
          type: "Requisitos",
        },
        {
          id: "P4",
          category: "Interação",
          description: "Como o sistema deverá fornecer o feedback sobre o resultado de uma ação da persona?",
          context: "Em caso de sucesso, o sistema deve exibir... Em caso de insucesso, o sistema deve exibir...",
          type: "Prototipação",
        },
      ],
      M3: [
        {
          id: "R4",
          category: "Alerta",
          description:
            "Para cada user story cuja funcionalidade pode ter consequências importantes a persona, analise se é necessário emitir um alerta sobre estas consequências. Quais informações serão fornecidas sobre as consequências e alternativas para o usuário?",
          context:
            "O sistema exibirá um alerta sobre a consequência A e as alternativas B e C para a persona. Considere a frequência de tais ações e seus danos. Cuidado para não sobrecarregar a persona com alertas.",
          type: "Requisitos",
        },
        {
          id: "P5",
          category: "Alerta",
          description:
            "Como os alertas serão apresentados para a persona? Como a persona pode confirmar ou seguir um caminho alternativo?",
          context:
            "As informações a serem mostradas no alerta serão R, S, T, respectivamente. Lembre-se de fornecer as consequências de cada ação e as alternativas para a persona.",
          type: "Prototipação",
        },
      ],
      M4: [
        {
          id: "R5",
          category: "Feedback Sobre o Progresso",
          description:
            "Se a funcionalidade descrita na user story levará mais de 2 segundos para ser concluída, analise como a persona será informada sobre o andamento. Quais informações serão fornecidas?",
          context: "O sistema informará sobre o andamento da operação por meio de ... com as informações R, S, T.",
          type: "Requisitos",
        },
        {
          id: "P6",
          category: "Feedback Sobre o Progresso",
          description: "Como a persona será informada quando o processo terminar?",
          context: "Ao concluir o processo, será exibido..... com a informação R.",
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
