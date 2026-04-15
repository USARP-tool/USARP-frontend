import Wrapper from "./Wrapper";

const meta = {
  title: "Layouts/Wrapper",
  component: Wrapper,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    elevation: {
      control: { type: "range", min: 0, max: 24, step: 1 },
    },
    variant: {
      options: ["elevation", "outlined"],
      control: { type: "radio" },
    },
    autoWidth: {
      control: "boolean",
    },
    children: {
      control: "text",
    },
  },
};

export default meta;

export const Default = {
  args: {
    children: <div>Conteúdo padrão do card</div>,
  },
};

export const ComplexContent = {
  args: {
    children: (
      <div style={{ textAlign: "center" }}>
        <h3>Título do Card</h3>
        <p>Este é um exemplo de conteúdo mais complexo</p>
        <button onClick={() => alert("Clique!")} style={{ padding: "8px 16px" }}>
          Botão de exemplo
        </button>
      </div>
    ),
  },
};

export const Outlined = {
  args: {
    variant: "outlined",
    children: <div>Card com borda outline</div>,
  },
};

export const HighElevation = {
  args: {
    elevation: 8,
    children: <div>Card com sombra pronunciada</div>,
  },
};

export const AutoWidth = {
  args: {
    autoWidth: true,
    children: <div>Card com largura automática</div>,
  },
};

export const FocusState = {
  args: {
    children: <div>Use Tab para focar neste card</div>,
    sx: { outline: "2px solid #2196f3", outlineOffset: "2px" },
  },
};

export const MobileView = {
  args: {
    children: (
      <div style={{ padding: "1rem" }}>
        <h4>Exemplo Mobile</h4>
        <p>Conteúdo otimizado para dispositivos móveis</p>
      </div>
    ),
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
