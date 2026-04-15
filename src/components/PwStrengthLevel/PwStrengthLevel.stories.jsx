import PwStrengthLevel from "./PwStrengthLevel";

export default {
  title: "components/PwStrengthLevel",
  component: PwStrengthLevel,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    password: {
      control: "text",
      description: "A senha para validação",
    },
  },
};

const Template = (args) => <PwStrengthLevel {...args} />;

export const Default = Template.bind({});
Default.args = {
  password: "",
};
Default.parameters = {
  docs: {
    description: {
      story: "Estado inicial quando nenhuma senha foi inserida (0 barras ativas).",
    },
  },
};

export const Low = Template.bind({});
Low.args = {
  password: "abc",
};
Low.parameters = {
  docs: {
    description: {
      story: "Senha fraca - atende apenas 1 critério (1 barra ativa).",
    },
  },
};

export const Medium = Template.bind({});
Medium.args = {
  password: "Abc123",
};
Medium.parameters = {
  docs: {
    description: {
      story: "Senha média - atende entre 2-4 critérios (2 barras ativas).",
    },
  },
};

export const High = Template.bind({});
High.args = {
  password: "Abc123!@#",
};
High.parameters = {
  docs: {
    description: {
      story: "Senha forte - atende todos os 5 critérios (3 barras ativas).",
    },
  },
};
