import PropTypes from "prop-types";
import style from "./styles.module.scss";

export function ButtonRoot({ children, ...rest }) {
  return (
    <button className={style.button__container} {...rest}>
      {children}
    </button>
  );
}

ButtonRoot.propTypes = {
  children: PropTypes.node.isRequired,
};
