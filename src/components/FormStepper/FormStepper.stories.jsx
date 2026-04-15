import FormStepper from "./FormStepper";

const defaultSteps = ["Email & Nome", "Senha", "Dados do Perfil"];

export default {
  title: "Components/FormStepper",
  component: FormStepper,
  tags: ["autodocs"],
  args: {
    steps: defaultSteps,
  },
  argTypes: {
    activeStep: {
      control: { type: "number", min: 0, max: defaultSteps.length - 1 },
      description: "Define o passo ativo no Stepper (0 = primeiro passo).",
    },
    steps: {
      control: { type: "object" },
      description: "Array de labels para cada step.",
    },
  },
};

export const Default = {
  args: {
    activeStep: 0,
  },
};

export const SecondStep = {
  args: {
    activeStep: 1,
  },
};

export const LastStep = {
  args: {
    activeStep: 2,
  },
};
