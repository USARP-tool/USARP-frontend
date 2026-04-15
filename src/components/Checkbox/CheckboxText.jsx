import { Text } from "../Text";
import styles from "./styles.module.scss";

export function CheckboxText({ children }) {
  return (
    <div>
      <Text.Root>
        <Text.Body data-type={"small"}>
          <span className={styles.checkbox__text}>{children}</span>
        </Text.Body>
      </Text.Root>
    </div>
  );
}
