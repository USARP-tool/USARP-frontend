import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import styles from "./styles.module.scss";

const Modal = ({
  isOpen,
  type = "success",
  title,
  text,
  onClose,
  buttonText,
  onButtonClick,
  autoCloseDuration = 0,
}) => {
  const timerRef = useRef(null);

  useEffect(() => {
    if (isOpen && autoCloseDuration > 0) {
      timerRef.current = setTimeout(() => {
        onClose();
      }, autoCloseDuration);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isOpen, autoCloseDuration, onClose]);

  if (!isOpen) {
    return null;
  }

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircleOutlineIcon className={styles.modalIcon} />;
      case "warning":
        return <WarningAmberIcon className={styles.modalIcon} />;
      case "error":
        return <ErrorOutlineIcon className={styles.modalIcon} />;
      default:
        return <CheckCircleOutlineIcon className={styles.modalIcon} />;
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={`${styles.container} ${styles[type]}`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalIconWrapper}>{getIcon()}</div>
        {title && <h2 className={styles.title}>{title}</h2>}
        {text && <p className={styles.text}>{text}</p>}
        {buttonText && (
          <button
            className={styles.modalButton}
            onClick={() => {
              if (onButtonClick) onButtonClick();
              onClose();
            }}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(["success", "warning", "error"]),
  title: PropTypes.string,
  text: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
  onButtonClick: PropTypes.func,
  autoCloseDuration: PropTypes.number,
};

export default Modal;
