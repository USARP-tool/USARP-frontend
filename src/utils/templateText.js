const templateCard = `Como <Nome do usuário>, eu quero <ação desejada>, para que <objetivo ou benefício>.`;
const templateConfirmation = 
`Cenário XX: <Título do cenário>

- Dado que <condição inicial>
- Quando <ação realizada>
- E <condição adicional, se houver>
- E <outra ação realizada>
- E <outra condição adicional, se houver>
- Então <resultado esperado>`;

const templateConversation = `
Pré-condição: <Descreva aqui a condição necessária antes do início do processo>
Pós-condição: <Descreva aqui a condição após a conclusão do processo>

Regras de Negócio:
1.x - <Descreva aqui a regra de negócio 1.x>

Aspectos de UI/UX:
M.x - <Descrição do Mecanismo de Usabilidade>

M.x: <Descreva o mecanismo de usabilidade>
R.x: <Descreva o requisito relacionado>
P.x: <Descreva o protótipo relacionado>
`;

export {templateCard, templateConfirmation, templateConversation };