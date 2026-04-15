import { forwardRef } from "react";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";
// eslint-disable-next-line react/display-name
const InputRoot = forwardRef(({ children, ...rest }, ref) => {
  return (
    <>
      <input {...rest} className={styles.input__container} ref={ref} />
      {children}
    </>
  );
});

InputRoot.propTypes = {
  children: PropTypes.node,
};
export default InputRoot;