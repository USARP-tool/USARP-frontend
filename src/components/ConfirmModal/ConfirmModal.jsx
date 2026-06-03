import styles from "./styles.module.scss";
import { AlertTriangle, CheckCircle } from "lucide-react";

export default function ConfirmModal({
  type = "warning",
  title,
  message,
  confirmText = "Continuar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
}) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* ICON */}
        <div
          className={
            type === "warning"
              ? styles.iconWarning
              : styles.iconSuccess
          }
        >
          {type === "warning" ? (
            <AlertTriangle size={42} strokeWidth={2.5} />
          ) : (
            <CheckCircle size={42} strokeWidth={2.5} />
          )}
        </div>

        {/* TEXTO */}
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>

        {/* BOTÕES */}
        <div className={styles.actions}>
          {type === "warning" ? (
            <>
              <button
                className={styles.cancel}
                onClick={onCancel}
              >
                {cancelText}
              </button>

              <button
                className={styles.confirm}
                onClick={onConfirm}
              >
                {confirmText}
              </button>
            </>
          ) : (
            <button
              className={styles.ok}
              onClick={onConfirm}
            >
              Ok
            </button>
          )}
        </div>
      </div>
    </div>
  );
}