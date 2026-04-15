export const FORMSTEPS = ["Email & Nome", "Senha", "Dados do Perfil"];

export const GENDER = [
  { value: "Feminino", label: "Feminino" },
  { value: "Masculino", label: "Masculino" },
  { value: "Não binário", label: "Não Binário" },
  { value: "Prefiro não informar", label: "Prefiro não informar" },
];

export const PROFILE = [
  { value: "Estudante de Graduação", label: "Estudante de Graduação" },
  { value: "Estudante de Pós-Graduação", label: "Estudante de Pós-Graduação" },
  { value: "Professor", label: "Professor" },
  { value: "Profissional da Industria", label: "Profissional da Industria" },
  { value: "Outro", label: "Outro" },
];

export const ROLE_IN_PROJECT = [
  { value: "Moderador", label: "Moderador" },
  { value: "Participante", label: "Participante" },
  { value: "Desenvolvedor(a)", label: "Desenvolvedor(a)" },
];

export const COLORSLEVEL = {
  EMPTY: "#E0E0E0",
  LOW: "#FE6732",
  MEDIUM: "#FFC53F",
  HIGH: "#33BDC3",
};

export const PASSWORD_STRENGTH = {
  ATLEASTONEUPPERCASE: /[A-Z]/,
  ATLEASTONELOWERCASE: /[a-z]/,
  ATLEASTONENUMERIC: /[0-9]/,
  ATLEASTONESPECIALCHAR: /[#?!@$%^&*-]/,
  EIGHTCHARSORMORE: /.{8,}/,
};

export const PROJECT_STATUS = [
  { value: "Novo", label: "Novo" },
  { value: "Excluído", label: "Excluído" },
  { value: "Mais antigo", label: "Mais antigo" },
];
