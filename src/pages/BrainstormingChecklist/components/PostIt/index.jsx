import { useState } from "react";
import styles from "./styles.module.scss";

export function PostIt({ text, onUpdate, onDelete, color }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleSave = () => {
    onUpdate(editText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(text);
    setIsEditing(false);
  };

  return (
    <div className={`${styles.postit__container} ${styles[`postit__${color.toLowerCase()}`]}`}>
      {isEditing ? (
        <div className={styles.postit__edit}>
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            placeholder="Adicione uma nota..."
            className={styles.postit__textarea}
            autoFocus
          />
          <div className={styles.postit__actions}>
            <button onClick={handleSave} className={styles.postit__btn_save}>
              Salvar
            </button>
            <button onClick={handleCancel} className={styles.postit__btn_cancel}>
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.postit__view} onClick={() => setIsEditing(true)}>
          <p>{text || "Clique para adicionar texto..."}</p>
          <button onClick={onDelete} className={styles.postit__btn_delete} title="Deletar">
            ×
          </button>
        </div>
      )}
    </div>
  );
}
