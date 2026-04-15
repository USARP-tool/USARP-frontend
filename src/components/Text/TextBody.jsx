import PropTypes from "prop-types";
import style from "./styles.module.scss";
/**
 * Texto para corpo/conteúdo principal
 * 
 * @param {string} text - Texto do corpo (alternativa a children)
 * @param {ReactNode} children - Conteúdo filho (alternativa a text)
 * @param {'big'|'medium'|'small'} data-type - Tamanho do texto
 * @param {Object} rest - Props adicionais
 * @returns {JSX.Element} Retorna texto estilizado para corpo
 */
export function TextBody({ text, children, ...rest }) {
  return (
    <span className={style.text__body} {...rest}>
      {children || text}
    </span>
  );
}

TextBody.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node,
  'data-type': PropTypes.oneOf(['big', 'medium', 'small']),
};

TextBody.defaultProps = {
  'data-type': 'medium',
};