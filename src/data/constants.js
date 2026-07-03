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
  { value: "Ativo", label: "Ativo" },
  { value: "Bloqueado", label: "Bloqueado" },
  { value: "Concluído/Encerrado", label: "Concluído/Encerrado" },
];

export const USERSTORY_TEMPLATE = {
  card: `Como <Nome do usuário>, eu quero <ação desejada>, para que <objetivo ou benefício>.`,
  confirmation: `
  Cenário XX: <Título do cenário>

  - Dado que <condição inicial>
  - Quando <ação realizada>
  - E <condição adicional, se houver>
  - E <outra ação realizada>
  - E <outra condição adicional, se houver>
  - Então <resultado esperado>`,
  conversation: `
Pré-condição: <Descreva aqui a condição necessária antes do início do processo>
Pós-condição: <Descreva aqui a condição após a conclusão do processo>

Regras de Negócio:
1.x - <Descreva aqui a regra de negócio 1.x>

Aspectos de UI/UX:
M.x - <Descrição do Mecanismo de Usabilidade>

M.x: <Descreva o mecanismo de usabilidade>
R.x: <Descreva o requisito relacionado>
P.x: <Descreva o protótipo relacionado>
`,
};
