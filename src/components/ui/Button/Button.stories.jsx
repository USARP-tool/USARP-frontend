import Button from "./Button";
import { Add, Send } from "@mui/icons-material";
import { baseSx, disableSx, outlineSx, textSx } from "./styles";

export default {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["contained", "outlined", "text"],
      description: "Variante visual do botão",
    },
    disabled: {
      control: "boolean",
      description: "Estado desabilitado do botão",
    },
    fullWidth: {
      control: "boolean",
      description: "O botão ocupa toda a largura disponível",
    },
    type: {
      control: { type: "select" },
      options: ["button", "submit", "reset"],
      description: "Tipo do botão",
    },
    iconPosition: {
      control: { type: "select" },
      options: ["start", "end"],
      description: "Posição do ícone em relação ao texto",
    },
    children: {
      control: "text",
      description: "Texto do botão",
    },
    onClick: {
      action: "clicked",
      description: "Função chamada quando o botão é clicado",
    },
    sx: {
      control: "object",
      description: "Estilos adicionais do Material-UI",
    },
  },
};

export const Default = {
  args: {
    children: "Botão Padrão",
    variant: "contained",
    sx: { ...baseSx },
  },
  parameters: {
    docs: {
      description: { story: "Botão padrão na variante contained." },
    },
  },
};

export const WithStartIcon = {
  args: {
    children: "Adicionar Item",
    icon: <Add />,
    iconPosition: "start",
    variant: "contained",
    sx: { ...baseSx },
  },
};

export const WithEndIcon = {
  args: {
    children: "Enviar",
    icon: <Send />,
    iconPosition: "end",
    variant: "contained",
    sx: { ...baseSx },
  },
};

export const Outlined = {
  args: {
    children: "Botão Outlined",
    variant: "outlined",
    sx: { ...outlineSx },
  },
};

export const Text = {
  args: {
    children: "Botão Text",
    variant: "text",
    sx: { ...textSx },
  },
};

export const Disabled = {
  args: {
    children: "Botão Desabilitado",
    disabled: true,
    variant: "contained",
    sx: { ...disableSx },
  },
};
