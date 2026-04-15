import Modal from "./Modal";

const meta = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Modal de feedback que exibe mensagens de Sucesso, Aviso ou Erro. Possui suporte a fechamento automático e botões de ação.",
      },
    },
  },
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Controla a visibilidade do modal.",
    },
    type: {
      control: "select",
      options: ["success", "warning", "error"],
      description: "Define a cor e o ícone do modal.",
    },
    title: {
      control: "text",
    },
    text: {
      control: "text",
    },
    buttonText: {
      control: "text",
      description: "Texto do botão de ação primária.",
    },
    autoCloseDuration: {
      control: "number",
      description: "Tempo em ms para fechar automaticamente (0 = desativado).",
    },
    onClose: { action: "closed" },
    onButtonClick: { action: "buttonClicked" },
  },
  args: {
    isOpen: true,
    title: "Título do Modal",
    text: "Mensagem descritiva do modal.",
  },
};

export default meta;

export const Success = {
  args: {
    type: "success",
    title: "Operação Realizada!",
    text: "Os dados foram salvos com sucesso no sistema.",
    buttonText: "Continuar",
  },
};

export const Warning = {
  args: {
    type: "warning",
    title: "Atenção Necessária",
    text: "Esta ação não pode ser desfeita. Tem certeza?",
    buttonText: "Entendi",
  },
};

export const Error = {
  args: {
    type: "error",
    title: "Erro de Conexão",
    text: "Não foi possível contatar o servidor. Tente novamente mais tarde.",
    buttonText: "Tentar Novamente",
  },
};

export const AutoClose = {
  args: {
    type: "success",
    title: "Salvando...",
    text: "Este modal fechará automaticamente em 3 segundos.",
    autoCloseDuration: 3000,
  },
  parameters: {
    docs: {
      description: {
        story: "Exemplo de modal que desaparece sozinho após o tempo configurado.",
      },
    },
  },
};

export const WithoutButton = {
  args: {
    type: "info",
    title: "Apenas Informativo",
    text: "Este modal não possui botão de ação, feche clicando fora.",
    buttonText: undefined,
  },
};
