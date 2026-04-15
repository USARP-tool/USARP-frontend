import PropTypes from "prop-types";
import styles from "./styles.module.scss";

export default function InputTextareaError({ children, ...rest }) {
  return (
    <span className={styles.inputTextarea__error} {...rest}>
      {children}
    </span>
  );
}

InputTextareaError.propTypes = {
  children: PropTypes.node,
};
