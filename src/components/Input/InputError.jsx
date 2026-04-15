import PropTypes from "prop-types";
import styles from "./styles.module.scss";

export default function InputError({ children, ...rest }) {
  return (
    <span className={styles.input__error} {...rest}>
      {children}
    </span>
  );
}

InputError.propTypes = {
  children: PropTypes.node,
};
