import PropTypes from "prop-types";

/**
 * FeedbackAlertTitle Component
 *
 * @param {string} title - Título principal do FeedbackAlert.
 * @param {string} name - Nome adicional a ser exibido (opcional).
 * @param {object} rest - Outras propriedades passadas para o elemento.
 * @returns {JSX.Element} - Retorna o título do FeedbackAlert.
 */
export function FeedbackAlertTitle({ title, name, ...rest }) {
  return (
    <h6 {...rest}>
      {title}
      {name && <span>{name}</span>}
    </h6>
  );
}

FeedbackAlertTitle.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string,
};
