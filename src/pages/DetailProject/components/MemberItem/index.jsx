import PropTypes from "prop-types";
import styles from "./index.module.scss";
import { IconChoice } from "../../../../utils/IconChoice";

/**
 * MemberItem Component
 *
 * @param {string} name - Nome do membro.
 * @param {string} icon - Nome do icone.
 * @param {string} email - E-mail do membro.
 * @param {string} organization - Organização do membro.
 * @param {string} color - Cor da titulo da urganização do membro.
 * @returns {JSX.Element} - Retorna o componente MemberItem.
 */
export function MemberItem({ name, icon, email, organization, color }) {
  return (
    <div className={styles.member_item}>
      <div>
        <IconChoice icon={icon} />
        <div>
          <h6>{name}</h6>
          <span>{email}</span>
        </div>
      </div>
      <span style={{ color: color }}>{organization}</span>
    </div>
  );
}

// Validação das propriedades
MemberItem.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  organization: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

// Valores padrão (opcional)
MemberItem.defaultProps = {
  name: "Nome não informado",
  icon: "user01",
  email: "E-mail não informado",
  organization: "Organização não informada",
};
