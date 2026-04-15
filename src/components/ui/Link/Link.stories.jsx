import { MemoryRouter } from "react-router-dom";
import Link from "./Link";

const meta = {
  title: "UI/Link",
  component: Link,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    color: {
      control: { type: "select" },
      options: ["primary", "secondary"],
      description: "Cor do link",
    },
    underline: {
      control: { type: "select" },
      options: ["none", "hover", "always"],
      description: "Estilo de sublinhado",
    },
    bold: {
      control: "boolean",
      description: "Se o texto é negrito",
    },
    external: {
      control: "boolean",
      description: "Se o link é externo (abre em nova aba)",
    },
    children: {
      control: "text",
      description: "Texto do link",
    },
    to: {
      control: "text",
      description: "URL interna (para React Router)",
    },
    href: {
      control: "text",
      description: "URL externa (para links normais)",
    },
    onClick: {
      action: "clicked",
      description: "Função chamada quando o link é clicado",
    },
    sx: {
      control: "object",
      description: "Estilos adicionais do Material-UI",
    },
  },
};

export default meta;

export const Default = {
  args: {
    children: "Link padrão",
    to: "/default",
  },
  parameters: {
    docs: {
      description: { story: "Link padrão com configurações básicas." },
    },
  },
};

export const AlwaysUnderline = {
  args: {
    children: "Link sempre sublinhado",
    to: "/always",
    underline: "always",
    sx: { textDecoration: "underline" },
  },
  parameters: {
    docs: {
      description: { story: "Link que está sempre sublinhado." },
    },
  },
};

export const Bold = {
  args: {
    children: "Link em negrito",
    to: "/bold",
    bold: true,
  },
  parameters: {
    docs: {
      description: { story: "Link com texto em negrito." },
    },
  },
};

export const External = {
  args: {
    children: "Link externo",
    to: "https://example.com",
    external: true,
  },
  parameters: {
    docs: {
      description: { story: "Link externo que abre em nova aba." },
    },
  },
};
