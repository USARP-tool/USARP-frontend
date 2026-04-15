import { Text } from "../Text";
import styles from "./styles.module.scss";

export function CheckboxGroupCaption({ children }) {
  return (
    <Text.Root>
      <Text.Caption>
        <span className={styles.checkboxGroup__caption}>{children}</span>
      </Text.Caption>
    </Text.Root>
  );
}
