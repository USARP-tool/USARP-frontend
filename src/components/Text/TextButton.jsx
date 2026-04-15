import PropTypes from "prop-types";
import style from "./styles.module.scss";

/**
 * Texto estilizado para botões
 * 
 * @param {string} text - Texto do botão (alternativa a children)
 * @param {ReactNode} children - Conteúdo filho (alternativa a text)
 * @param {'big'|'medium'|'small'} data-type - Tamanho do texto do botão
 * @param {Object} rest - Props adicionais
 * @returns {JSX.Element} Retorna texto estilizado para botões
 */
export function TextButton({ text, children, ...rest }) {
  return (
    <span className={style.text__button} {...rest}>
      {children || text}
    </span>
  );
}

TextButton.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node,
  'data-type': PropTypes.oneOf(['big', 'medium', 'small']),
};

TextButton.defaultProps = {
  'data-type': 'medium',
};