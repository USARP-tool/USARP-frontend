import PropTypes from "prop-types";
import style from "./styles.module.scss";

/**
 * Texto para legendas ou informações auxiliares
 * 
 * @param {string} text - Texto da legenda (alternativa a children)
 * @param {ReactNode} children - Conteúdo filho (alternativa a text)
 * @param {'regular'|'medium'|'semibold'} data-type - Peso da fonte
 * @param {Object} rest - Props adicionais
 * @returns {JSX.Element} Retorna texto estilizado para legendas
 */
export function TextCaption({ text, children, ...rest }) {
  return (
    <span className={style.text__caption} {...rest}>
      {children || text}
    </span>
  );
}

TextCaption.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node,
  'data-type': PropTypes.oneOf(['regular', 'medium', 'semibold']),
};

TextCaption.defaultProps = {
  'data-type': 'regular',
};
