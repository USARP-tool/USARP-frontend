import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import { Text } from "../Text";
import { useState } from "react";
export function Toast({ type, message, children, ...rest }) {
  const [isLeaving, setIsLeaving] = useState(false);
  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      if (rest.onClick) {
        rest.onClick();
      }
    }, 500);
  };
  return (
    <div className={styles.overlay}>
      <div
        style={rest.style} 
        className={`
          ${type == "success" ? styles.toast__success : styles.toast__error}
          ${isLeaving ? 'leaving' : ''}
          `
        }
      >
        <Text.Root>
          <Text.Body data-type="small" text={message} />
        </Text.Root>
        <button onClick={handleClose} type="button">
          {children}
        </button>
      </div>
    </div>
  );
}

Toast.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
  children: PropTypes.node,
};
