import InputDate from "./InputDate";

const meta = {
  title: "UI/InputDate",
  component: InputDate,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "300px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label: {
      control: "text",
      description: "Rótulo do campo de data",
    },
    value: {
      control: "text",
      description: "Valor da data no formato YYYY-MM-DD",
    },
    error: {
      control: "boolean",
      description: "Indica se o campo está em estado de erro",
    },
    disabled: {
      control: "boolean",
      description: "Indica se o campo está desabilitado",
    },
    required: {
      control: "boolean",
      description: "Indica se o campo é obrigatório",
    },
    helperText: {
      control: "text",
      description: "Texto de ajuda ou erro abaixo do campo",
    },
    sx: {
      control: "object",
      description: "Estilos adicionais do Material-UI",
    },
    onChange: {
      action: "changed",
      description: "Função chamada quando o valor muda",
    },
  },
};

export default meta;

export const Default = {
  args: {
    label: "Data de nascimento",
  },
  parameters: {
    docs: {
      description: { story: "Campo de data padrão com label flutuante." },
    },
  },
};

export const WithError = {
  args: {
    label: "Data de expiração",
    error: true,
    helperText: "Data não pode ser no passado",
    value: "2023-01-01",
  },
  parameters: {
    docs: {
      description: { story: "Campo de data em estado de erro com mensagem de validação." },
    },
  },
};

export const Disabled = {
  args: {
    label: "Data de contratação",
    value: "2024-03-20",
    disabled: true,
  },
  parameters: {
    docs: {
      description: { story: "Campo de data desabilitado." },
    },
  },
};

export const Required = {
  args: {
    label: "Data de entrega",
    required: true,
    helperText: "Este campo é obrigatório",
  },
  parameters: {
    docs: {
      description: { story: "Campo de data marcado como obrigatório." },
    },
  },
};
