import styles from "./styles.module.scss";
import { AlertTriangle, CheckCircle } from "lucide-react";

export default function ConfirmModal({
  type = "warning",
  title,
  message,
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
            <AlertTriangle size={50} />
          ) : (
            <CheckCircle size={50} />
          )}
        </div>

        {/* TEXTO */}
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>

        {/* BOTÕES */}
        <div className={styles.actions}>
          {type === "warning" ? (
            <>
              <button className={styles.cancel} onClick={onCancel}>
                Cancelar
              </button>
              <button className={styles.confirm} onClick={onConfirm}>
                Alterar status do projeto
              </button>
            </>
          ) : (
            <button className={styles.ok} onClick={onConfirm}>
              Ok, fechar
            </button>
          )}
        </div>

      </div>
    </div>
  );
}