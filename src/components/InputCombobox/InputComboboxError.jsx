import PropTypes from "prop-types";
import styles from "./styles.module.scss";

export default function InputComboboxError({ children, ...rest }) {
  return (
    <span className={styles.input__error} {...rest}>
      {children}
    </span>
  );
}

InputComboboxError.propTypes = {
  children: PropTypes.node,
};
