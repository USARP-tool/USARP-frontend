import styles from "./styles.module.scss";
import { Check } from "lucide-react";

export function CheckboxRoot({ children, checked, ...props }) {
  return (
    <label className={styles.checkbox__container}>
      <input type="checkbox" {...props} />
      <div className={styles.checkmark + ` ${checked ? styles.checked : ""}`}>
        <span className={styles.checkmark__icon}>
          <Check />
        </span>
      </div>
      {children}
    </label>
  );
}
