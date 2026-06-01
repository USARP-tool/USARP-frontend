export const PROJECT_STATUS_RULES = {
  Ativo: {
    canEdit: true,
    canEditMembers: true,
    visibleToMembers: true,
    message: "Modo ativo: edição completa liberada.",
  },
  Bloqueado: {
    canEdit: false,
    canEditMembers: false,
    visibleToMembers: true,
    message: "Modo bloqueado: apenas visualização.",
  },
  "Concluído/Encerrado": {
    canEdit: false,
    canEditMembers: false,
    visibleToMembers: false,
    message: "Projeto concluído: visível apenas para o criador.",
  },
};