import PropTypes from "prop-types";
import styles from "./styles.module.scss";

/**
 * FeedbackAlertRoot Component
 *
 * @param {node} children - Conteúdo a ser renderizado dentro do container.
 * @param {object} rest - Outras propriedades passadas para o elemento.
 * @returns {JSX.Element} - Retorna o container do FeedbackAlert.
 */
export function FeedbackAlertRoot({ children, ...rest }) {
  return (
    <div className={styles.overlay}>
      <div {...rest} className={styles.feedbackalert__container}>
        {children}
      </div>
    </div>
  );
}

FeedbackAlertRoot.propTypes = {
  children: PropTypes.node.isRequired,
};
