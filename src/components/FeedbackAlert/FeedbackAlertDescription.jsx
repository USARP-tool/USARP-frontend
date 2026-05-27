import PropTypes from "prop-types";
import { Text } from "../Text";

/**
 * FeedbackAlertDescription Component
 *
 * @param {string} description - Descrição a ser exibida (pode conter HTML).
 * @param {object} rest - Outras propriedades passadas para o elemento.
 * @returns {JSX.Element} - Retorna a descrição do FeedbackAlert.
 */
export function FeedbackAlertDescription({ description, ...rest }) {
  return (
    <Text.Body
      className="description"
      data-type="medium"
      {...rest}
      dangerouslySetInnerHTML={{ __html: description }}
    ></Text.Body>
  );
}

FeedbackAlertDescription.propTypes = {
  description: PropTypes.string.isRequired,
};
