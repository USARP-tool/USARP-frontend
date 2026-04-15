import PropTypes from "prop-types";
import styles from "./styles.module.scss";

/**
 * FeedbackAlertButton Component
 *
 * @param {string} label - Texto do botão.
 * @param {object} rest - Outras propriedades passadas para o elemento.
 * @returns {JSX.Element} - Retorna o botão do FeedbackAlert.
 */
export function FeedbackAlertButton({ label, ...rest }) {
  return (
    <button className={styles.feedbackalert__button} {...rest}>
      {label}
    </button>
  );
}

FeedbackAlertButton.propTypes = {
  label: PropTypes.string.isRequired,
};
