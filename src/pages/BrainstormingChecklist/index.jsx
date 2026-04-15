import { useState } from "react";
import { ChecklistHeader } from "./components/ChecklistHeader";
import styles from "./styles.module.scss";
import Checklist from "./components/Checklist";
import CardsContainer from "./components/CardsContainer";

export function BrainstormingChecklist() {
  const avatarMock = [
    {
      id: 1,
      name: "João",
      icon: "user02_orange",
    },
    {
      id: 2,
      name: "Júlia",
      icon: "user03_orange",
    },
    {
      id: 3,
      name: "Fernando",
      icon: "user04_orange",
    },
    {
      id: 4,
      name: "Cleiton",
      icon: "user05_orange",
    },
    {
      id: 5,
      name: "Thaís",
      icon: "user06_orange",
    },
  ];

  const avatarList = avatarMock;

  // MOCK DATA PARA O CHECKLIST COM AS CARTAS (REFATORAR PARA VIR DO BACKEND)
  // TODO: Inserir os ícones que vierem do backend
  const accordionItems = {
    groups: [
      {
        id: "G1",
        title: "Feedback do sistema",
        cardsGroup: [
          {
            id: "G1.1",
            caption: "A funcionalidade pode afetar o estado do sistema",
            cards: [
              {
                id: "M1",
                category: "Status do sistema",
                description:
                  "Informar os usuários sobre o estado interno do sistema.",
                context:
                  "Quando ocorrer alguma mudança ou falha no sistema que é importante para o usuário.",
              },
              {
                id: "M2",
                category: "Interação",
                description:
                  "Informar os usuários que o sistema registro uma interação do usuário.",
                context:
                  "Quando o usuário realiza um evento de interação, como clique do mouse, movimento do mouse, movimento da seta, pressionamento do teclado e etc, o sistema deve informar ao usuário que a interação foi aceita.",
              },
              {
                id: "M4",
                category: "Feedback sobre o progresso",
                description:
                  "Informar os usuários quando o sistema estiver processando uma ação que poderá levar algum tempo para completar.",
                context:
                  "Quando um processo demorado interrompe a interface do usuário por mais de dois segundos.",
              },
            ],
          },
          {
            id: "G1.2",
            caption:
              "A funcionalidade tem consequências relevantes para a persona",
            cards: [
              {
                id: "M3",
                category: "Alerta",
                description:
                  "Informar os usuários sobre qualquer ação com consequências importantes",
                context:
                  "Quando uma ação que tem sérias consequências é exigida pelo usuário.",
              },
            ],
          },
        ],
      },
      {
        id: "G2",
        title: "Personalização do sistema",
        cardsGroup: [
          {
            id: "G2.1",
            caption: "A persona deseja favoritar elementos ou funções",
            cards: [
              {
                id: "M13",
                category: "Favoritos",
                description:
                  "Registrar partes do sistema e do conteúdo que são de interesse do usuário.",
                context:
                  "Em um sistema de software navegável, quando o sistema é possivelmente grande e complexo e permite que o usuário se mova livremente por ele de maneiras não diretamente suportadas pela estrutura do artefato.",
              },
            ],
          },
          {
            id: "G2.2",
            caption: "A persona deseja personalizar o sistema",
            cards: [
              {
                id: "M11",
                category: "Preferências",
                description:
                  "Registrar as opções do usuário no uso das funções do sistema.",
                context:
                  "Quando a aplicação é muito complexa e muitas de suas funções podem ser ajustadas à preferência do usuário e não se sabe o suficiente sobre as preferências do usuáriopara assumir padrões que se adequam a todos os usuários.",
              },
              {
                id: "M12",
                category: "Area de objetos pessoais",
                description:
                  "Registrar as opções do usuário no uso da interface do sistema.",
                context:
                  "Quando a interface do aplicativo é complexa e possui muitos ícones que podem ser organizados de maneiras diferentes.",
              },
              {
                id: "M4",
                category: "Feedback sobre progresso",
                description:
                  "Informar os usuários quando o sistema estiver processando uma ação que poderá levar algum tempo para completar.",
                context:
                  "Quando um processo demorado interrompe a interface do usuário por mais de dois segundos.",
              },
            ],
          },
        ],
      },
      {
        id: "G3",
        title: "Controle e suporte ao usuário",
        cardsGroup: [
          {
            id: "G3.1",
            caption:
              "A funcionalidade envolve diferentes páginas ou interfaces",
            cards: [
              {
                id: "M8",
                category: "Voltar",
                description:
                  "Retornar a um determinado estado em uma sequência de execução de comandos",
                context:
                  "Quando existem aplicativos interativos com várias etapas.",
              },
            ],
          },
          {
            id: "G3.2",
            caption: "A persona pode cancelar ou desfazer ações",
            cards: [
              {
                id: "M5",
                category: "Desfazer",
                description: "Desfazer várias ações em um objeto",
                context:
                  "Ao construir um sistema altamente interativo com funcionalidades múltiplas e complexas em objetos específicos do sistema.",
              },
              {
                id: "M6",
                category: "Abortar operação",
                description: "Cancelar a execução de toda a aplicação.",
                context:
                  "Quando o usuário precisa sair de um aplicativo ou comando rapidamente.",
              },
              {
                id: "M7",
                category: "Cancelar",
                description: "Cancelar a execução de uma ação.",
                context:
                  "Quando o usuário precisa cancelar uma ação específica.",
              },
            ],
          },
          {
            id: "G3.3",
            caption:
              "A persona necessita de conteúdos de ajuda para utilizar a funcionalidade",
            cards: [
              {
                id: "M14",
                category: "Ajuda multinível",
                description:
                  "Prover diferentes níveis de ajuda para diferentes usuários",
                context:
                  "Quando o aplicativo a ser desenvolvido écomplexo e é provável que alguns usuários precisem de um sistema de ajuda completo, mas a maioria dos usuários não leva tempopara usá-lo; portanto, os desenvolvedores desejam oferecer suporte a usuários impacientes e/ou ocasionais.",
              },
            ],
          },
        ],
      },
      {
        id: "G4",
        title: "Entrada de dados do usuário",
        cardsGroup: [
          {
            id: "G4.1",
            caption: "A funcionalidade requer dados em formatos específicos",
            cards: [
              {
                id: "M9",
                category: "Entrada de texto estruturada",
                description:
                  "Prevenir que os usuários cometam erros de entrada de dados",
                context:
                  "Quando o sistema pode aceitar apenas entradas do usuário em um formato muito específico.",
              },
            ],
          },
          {
            id: "G4.2",
            caption:
              "A funcionalidade requer diferentes passos com entrada de dados",
            cards: [
              {
                id: "M10",
                category: "Execução passo-a-passo",
                description:
                  "Auxiliar os usuários em tarefas que requerem diferentes passos com entrada de dados correta.",
                context:
                  "Quando um usuário não especialista precisa executar uma tarefa complexa não frequente que consiste em várias subtarefas nas quais énecessário tomar decisões em cada subtarefa.",
              },
            ],
          },
        ],
      },
    ],
  };

  const [checkedItems, setCheckedItems] = useState([]);

  const [displayedCardsGroup, setDisplayedCardsGroup] = useState(null);

  const handleCheck = (id) => {
    setCheckedItems((prev) => {
      const isChecked = prev.includes(id);
      const newList = isChecked
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id];
      return newList;
    });
  };

  const onSelectedAccordionItem = (groupId) => {
    const group = accordionItems.groups.find((g) => g.id === groupId);
    if (group) {
      setDisplayedCardsGroup(group.cardsGroup);
    } else {
      setDisplayedCardsGroup(null);
    }
  };

  const handleSignOutSession = () => {
    console.log("saiu da sessão");
  };

  const handleSubmitChecklist = () => {
    console.log("Botão de preencher cartas");
  };
  return (
    <div className={styles.brainstormingChecklist__container}>
      <ChecklistHeader
        avatarList={avatarList}
        handleSignOutSession={handleSignOutSession}
      />
      <main className={styles.content}>
        <Checklist
          accordionItems={accordionItems}
          checkedItems={checkedItems}
          handleCheck={handleCheck}
          handleSubmitChecklist={handleSubmitChecklist}
          onSelectedAccordionItem={onSelectedAccordionItem}
        />
        {
          // TODO: Implementar lógica para exibir ícones
        }
        <CardsContainer
          displayedCards={displayedCardsGroup}
          checkedItems={checkedItems}
        />
      </main>
    </div>
  );
}
