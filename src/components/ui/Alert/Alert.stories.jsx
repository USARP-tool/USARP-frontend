import Alert from "./Alert";

const meta = {
  title: "UI/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    severity: {
      control: "select",
      options: ["success", "info", "warning", "error"],
      description: "Define a cor e o ícone do alerta.",
    },
    title: {
      control: "text",
      description: "O texto opcional do título.",
    },
    text: {
      control: "text",
      description: "O conteúdo (mensagem) principal do alerta.",
    },
    onClose: {
      action: "onCloseClicked",
      description: 'Função callback. Se fornecida, exibe o ícone "X" para fechar.',
    },
  },
  args: {
    severity: "info",
    title: "Título",
    text: "Esta é a mensagem principal do alerta. Use os controles para testar.",
  },
};

export default meta;

export const Default = {
  args: {
    severity: "success",
    title: "Sucesso!",
    text: "Sua operação foi concluída com êxito.",
  },
};

export const Success = {
  args: {
    severity: "success",
    title: "Sucesso!",
    text: "Sua operação foi concluída com êxito.",
  },
};

export const Info = {
  args: {
    severity: "info",
    title: "Informação",
    text: "Não se esqueça de verificar suas notificações.",
  },
};

export const Warning = {
  args: {
    severity: "warning",
    title: "Atenção",
    text: "Seu período de teste expira em 3 dias.",
  },
};

export const Error = {
  args: {
    severity: "error",
    title: "Erro!",
    text: "Falha ao processar sua solicitação. Tente novamente.",
  },
};

export const SemTitulo = {
  name: "Sem Título",
  args: {
    severity: "success",
    text: "Este alerta funciona perfeitamente sem um título.",
    title: undefined,
  },
};
