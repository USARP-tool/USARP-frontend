import Input from "./Input";

const meta = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "number", "tel", "url", "date", "search"],
      description: "Tipo do input HTML (ignorado se multiline for true)",
    },
    variant: {
      control: { type: "select" },
      options: ["outlined", "filled", "standard"],
    },
    multiline: {
      control: "boolean",
      description: "Transforma o input em um Textarea",
      table: { defaultValue: { summary: "false" } },
    },
    rows: {
      control: "number",
      description: "Número de linhas visíveis (apenas se multiline=true)",
      table: { defaultValue: { summary: "1" } },
    },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    showPasswordToggle: { control: "boolean" },
    autoFocus: { control: "boolean" },
    sx: { control: "object" },
    onChange: { action: "changed" },
    onBlur: { action: "blurred" },
  },
};

export default meta;

export const Default = {
  args: {
    label: "Nome completo",
    placeholder: "Digite seu nome",
  },
};

export const Password = {
  args: {
    label: "Senha",
    type: "password",
    placeholder: "Digite sua senha",
    showPasswordToggle: true,
    helperText: "Clique no ícone para ver a senha",
  },
  parameters: {
    docs: {
      description: { story: "Campo de senha com botão para mostrar/ocultar." },
    },
  },
};

export const Textarea = {
  args: {
    label: "Descrição do Projeto",
    placeholder: "Escreva uma descrição detalhada...",
    multiline: true,
    rows: 4,
    helperText: "Este campo cresce conforme o conteúdo ou tem altura fixa definida por 'rows'.",
  },
  parameters: {
    docs: {
      description: { story: "Input transformado em área de texto de múltiplas linhas." },
    },
  },
};

export const WithError = {
  args: {
    label: "Email",
    type: "email",
    value: "email-invalido",
    error: true,
    helperText: "Por favor, digite um email válido",
  },
  parameters: {
    docs: {
      description: { story: "Campo em estado de erro com mensagem de ajuda." },
    },
  },
};

export const Disabled = {
  args: {
    label: "Campo desabilitado",
    value: "Valor pré-definido",
    disabled: true,
  },
  parameters: {
    docs: {
      description: { story: "Campo desabilitado - usuário não pode interagir." },
    },
  },
};

export const WithLengthLimits = {
  args: {
    label: "Username",
    placeholder: "Mínimo 3, máximo 5 caracteres",
    minLength: 3,
    maxLength: 5,
    helperText: "Deve ter entre 3 e 5 caracteres",
  },
  parameters: {
    docs: {
      description: { story: "Campo com validação de comprimento mínimo e máximo." },
    },
  },
};
