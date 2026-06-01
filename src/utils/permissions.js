export const ROLES = {
  OWNER: "OWNER",
  MODERATOR: "MODERATOR",
  PARTICIPANT: "PARTICIPANT",
};


export const can = (userRole, action) => {
  const rules = {
    addMember: [ROLES.OWNER, ROLES.MODERATOR],
    removeMember: [ROLES.OWNER],
    changeRole: [ROLES.OWNER],
    viewProjects: [ROLES.OWNER, ROLES.MODERATOR, ROLES.PARTICIPANT],
    changeStatus: [ROLES.OWNER],
  };

  return rules[action]?.includes(userRole);
};