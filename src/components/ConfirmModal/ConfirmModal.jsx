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
        <div className={type === "warning" ? styles.iconWarning : styles.iconSuccess}>
          {type === "warning" ? (
            <AlertTriangle size={42} strokeWidth={2.5} />
          ) : (
            <CheckCircle size={42} strokeWidth={2.5} />
          )}
        </div>

        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>

        <div className={styles.actions}>
          {/* sempre ter cancel se warning */}
          {type === "warning" && (
            <button className={styles.cancel} onClick={onCancel}>
              {cancelText}
            </button>
          )}

          <button className={type === "warning" ? styles.confirm : styles.ok} onClick={onConfirm}>
            {type === "warning" ? confirmText : "Ok"}
          </button>
        </div>
      </div>
    </div>
  );
}
