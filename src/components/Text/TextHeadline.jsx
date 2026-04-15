import PropTypes from "prop-types";
import style from "./styles.module.scss";

/**
 * Componente para títulos/títulos
 * 
 * @param {string} text - Texto do título (alternativa a children)
 * @param {string} as - Tag HTML a ser renderizada (h1-h6)
 * @param {ReactNode} children - Conteúdo filho (alternativa a text)
 * @param {Object} rest - Props adicionais
 * @returns {JSX.Element} Retorna um elemento de título
 */
export function TextHeadline({ text, as: Tag = "h1", children, ...rest }) {
  return (
    <Tag className={style.headline} {...rest}>
      {children || text}
    </Tag>
  );
}

TextHeadline.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node,
  as: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6"]),
};

TextHeadline.defaultProps = {
  as: "h1",
};