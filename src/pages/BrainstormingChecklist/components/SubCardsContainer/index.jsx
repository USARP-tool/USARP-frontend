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
      M5: [
        {
          id: "R6",
          category: "Desfazer",
          description:
            "Analise se a funcionalidade descrita na user story terá um efeito permanente no sistema ou poderá ser desfeita.",
          context: "A ação W poderá ser desfeita, portanto, certifique-se de que uma opção de desfazer seja fornecida.",
          type: "Requisitos",
        },
        {
          id: "R7",
          category: "Desfazer",
          description:
            "Analise se a funcionalidade descrita na user story exigirá combinações diferentes de desfazer/refazer ou apenas a função desfazer será necessária?",
          context:
            "A ação poderá ser cancelada durante sua execução, portanto, é necessário mecanismos de cancelamento para abortá-lo.",
          type: "Requisitos",
        },
        {
          id: "P7",
          category: "Desfazer",
          description: "Qual é a melhor maneira de apresentar a opção desfazer/refazer para a persona?",
          context: "A opção desfazer para a ação W será apresentada no formato T.",
          type: "Prototipação",
        },
      ],
      M6: [
        {
          id: "R8",
          category: "Abortar Operação",
          description: "A persona deseja uma opção de saída no sistema?",
          context: "Como <persona> eu quero sair do sistema para que <justificativa>.",
          type: "Requisitos",
        },
        {
          id: "P8",
          category: "Abortar Operação",
          description: "Onde e como a opção de saída do sistema deve ser apresentada a persona?",
          context: "A opção de saída do sistema será apresentada no formato T e ficará localizada no(a)....",
          type: "Prototipação",
        },
      ],
      M7: [
        {
          id: "R9",
          category: "Cancelar",
          description: "Analise se a funcionalidade descrita na user story poderá ser cancelada durante sua execução.",
          context:
            "A ação poderá ser cancelada durante sua execução, portanto, é necessário mecanismos de cancelamento para abortá-lo.",
          type: "Requisitos",
        },
        {
          id: "P9",
          category: "Cancelar",
          description:
            "Como a opção de cancelamento deve ser apresentada a persona e qual será o estado em que o sistema ficará quando a opção de cancelamento for escolhida?",
          context: "A opção de cancelamento será apresentada no formato T.",
          type: "Prototipação",
        },
      ],
      M8: [
        {
          id: "R10",
          category: "Voltar",
          description:
            "Analise se a funcionalidade descrita na user story requer uma opção de retorno durante sua realização. Em caso afirmativo, qual seria o retorno da funcionalidade?",
          context:
            "A ação A exige varias etapas para serem executadas, portanto, forneça uma opção para voltar aos estados U, V, W, respectivamente.",
          type: "Requisitos",
        },
        {
          id: "R11",
          category: "Voltar",
          description:
            "Analise se a funcionalidade descrita na user story requer uma opção para ir a um local original. Em caso afirmativo, qual será o local original ou seguro?",
          context: "A opção de ir ao local .... será fornecida.",
          type: "Requisitos",
        },
        {
          id: "P10",
          category: "Voltar",
          description: "Qual é a melhor maneira de apresentar a opção voltar para a persona?",
          context: "A opção voltar será apresentada no formato T e ficará localiza no(a)....",
          type: "Prototipação",
        },
      ],
      M9: [
        {
          id: "R12",
          category: "Entrada de Texto Estruturada",
          description:
            "Analise se a funcionalidade descrita na user story requer a entrada de dados em um formato específico.",
          context: "Os dados M e N serão inseridos pela persona nos formatos P e Q, respectivamente.",
          type: "Requisitos",
        },
        {
          id: "P11",
          category: "Entrada de Texto Estruturada",
          description:
            "Como orientar a persona na introdução da entrada de texto no formato exigido? Poderá usar padrões ou restringir a entrada de texto da persona, por exemplo, usando listas de verificação ou listas de combinação, etc.",
          context:
            "A persona será orientada na introdução de dados ao apresentar o formato nas formas A e B, respectivamente.",
          type: "Prototipação",
        },
      ],
      M10: [
        {
          id: "R13",
          category: "Execução Passo-a-Passo",
          description:
            "Analise se a funcionalidade descrita na user story é complexa e requer a realização de diversos passos de interação. Em caso afirmativo, quais seriam esses passos?",
          context: "A ação A requer várias etapas a serem executadas. As etapas para essa ação são U, V, R.",
          type: "Requisitos",
        },
        {
          id: "R14",
          category: "Execução Passo-a-Passo",
          description: "Quais informações da persona serão necessárias em cada etapa?",
          context: "As informações a serem fornecidas em cada etapa são R, S, T, respectivamente.",
          type: "Requisitos",
        },
        {
          id: "P12",
          category: "Execução Passo-a-Passo",
          description: "Qual é a melhor maneira de apresentar essas etapas a persona?",
          context: "As etapas serão representadas no formato J.",
          type: "Prototipação",
        },
      ],
      M11: [
        {
          id: "R15",
          category: "Preferências",
          description: "A persona deseja configurar preferências específicas no sistema? Em caso afirmativo, quais?",
          context: "Como <persona> eu quero configurar as opções A, B e C para que <justificativa>.",
          type: "Requisitos",
        },
        {
          id: "P13",
          category: "Preferências",
          description: "Qual é a melhor maneira de mostrar e permitir que as personas configurem suas preferências?",
          context: "As opções serão representadas no formato J.",
          type: "Prototipação",
        },
      ],
      M12: [
        {
          id: "R16",
          category: "Áreas de Objetos Pessoais",
          description:
            "A persona deseja organizar seu próprio layout? Em caso afirmativo, quais elementos a persona deseja organizar?",
          context: "Como <persona> eu quero organizar as opções A, B e C para que <justificativa>.",
          type: "Requisitos",
        },
        {
          id: "P14",
          category: "Áreas de Objetos Pessoais",
          description: "Como os elementos serão organizados?",
          context: "As opções serão apresentadas no formato F.",
          type: "Prototipação",
        },
      ],
      M13: [
        {
          id: "R17",
          category: "Favoritos",
          description:
            "A persona deseja favoritar as diferentes ações que ela executa? Se sim, quais ações podem ser favoritadas? Dependendo do tipo de ação do sistema, a ação pode ser uma funcionalidade específica executada pela persona, um local visitado, etc.",
          context: "Como <persona> eu quero favoritar as ações A, B e C, para que <justificativa>.",
          type: "Requisitos",
        },
        {
          id: "R18",
          category: "Favoritos",
          description:
            "A persona deseja favoritar itens? Se sim, quais itens podem ser favoritados? Dependendo do tipo de item do sistema, o item pode ser uma mensagem, contato, etc.",
          context: "Como <persona> eu quero favoritar os itens D, E e F, para que <justificativa>.",
          type: "Requisitos",
        },
        {
          id: "P15",
          category: "Favoritos",
          description: "Como a opção favoritar será apresentada para a persona?",
          context: "A opção será apresentada no formato F.",
          type: "Prototipação",
        },
      ],
      M14: [
        {
          id: "R19",
          category: "Ajuda Multinível",
          description: "A persona deseja ter acesso a um procedimento de ajuda em forma de manual do sistema?",
          context: "Como <persona> eu quero obter ajuda por meio de um manual do sistema, para que <justificativa>.",
          type: "Requisitos",
        },
        {
          id: "R20",
          category: "Ajuda Multinível",
          description:
            "Analise qual procedimento de ajuda é mais adequado para a funcionalidade descrita na user story.",
          context: "A ajuda fornecida para essa user story será dicas de ....",
          type: "Requisitos",
        },
        {
          id: "P16",
          category: "Ajuda Multinível",
          description:
            "Caso seja necessária opção de ajuda, como um manual do sistema, como essa opção será apresentada para a persona?",
          context: "A opção de ajuda será apresentada no formato F.",
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
