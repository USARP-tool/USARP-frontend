import { MemoryRouter } from "react-router-dom";
import ProjectTable from "./ProjectTable";

import { cssVariablesStyle, mockRows, largeMockRows } from "./StoryVariables";

const meta = {
  title: "Components/ProjectTable",
  component: ProjectTable,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={cssVariablesStyle}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "O `ProjectTable` é um componente complexo de tabela que gerencia internamente a paginação e a ordenação. Ele espera receber um array de objetos contendo as informações do projeto. As datas devem ser passadas no formato ISO (YYYY-MM-DD) para garantir a ordenação correta, sendo formatadas visualmente para DD/MM/AAAA.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    rows: {
      description: "Array de objetos contendo os dados dos projetos.",
      control: "object",
      table: {
        type: { summary: "Array" },
      },
    },
  },
};

export default meta;

export const Default = {
  args: {
    rows: mockRows,
  },
};

export const WithPagination = {
  args: {
    rows: largeMockRows,
  },
};

export const EmptyState = {
  args: {
    rows: [],
  },
};
