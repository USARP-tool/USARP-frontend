import PropTypes from "prop-types";
import style from "./styles.module.scss";

/**
 * 
 * @param {ReactNode} children - Conteúdo filho a ser renderizado
 * @param {Object} rest - Props adicionais para a div container
 * @returns {JSX.Element} Retorna um container para agrupar textos
 */
export function TextRoot({ children, ...rest }) {
  return (
    <div className={style.text__container} {...rest}>
      {children}
    </div>
  );
}

TextRoot.propTypes = {
  children: PropTypes.node.isRequired,
};