import PropTypes from "prop-types";
import { IconChoice } from "../../utils/IconChoice";

/**
 * FeedbackAlertIcon Component
 *
 * @param {string} icon - Nome do ícone a ser exibido.
 * @returns {JSX.Element} - Retorna o ícone do FeedbackAlert.
 */
export function FeedbackAlertIcon({ icon }) {
  return <IconChoice icon={icon} />;
}

FeedbackAlertIcon.propTypes = {
  icon: PropTypes.string.isRequired,
};
