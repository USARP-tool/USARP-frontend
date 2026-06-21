import { Text } from "../../../../components/Text";
import styles from "./styles.module.scss";

export function SubCard({ type, question, guide }) {
  return (
    <div className={`${styles.subcard__container} ${styles[`subcard__${type.toLowerCase()}`]}`}>
      <div className={styles.subcard__header}>
        <span className={styles.subcard__type}>{type}</span>
      </div>
      <div className={styles.subcard__content}>
        <div className={styles.subcard__section}>
          <Text.Root>
            <Text.Caption className={styles.subcard__label}>Questão</Text.Caption>
          </Text.Root>
          <Text.Root>
            <Text.Body className={styles.subcard__text}>{question}</Text.Body>
          </Text.Root>
        </div>
        <div className={styles.subcard__section}>
          <Text.Root>
            <Text.Caption className={styles.subcard__label}>
              {type === "Requisitos"
                ? "Guia de Especificação do Requisito de Usabilidade"
                : "Guia de Especificação do Complemento de Prototipação"}
            </Text.Caption>
          </Text.Root>
          <Text.Root>
            <Text.Body className={styles.subcard__text}>{guide}</Text.Body>
          </Text.Root>
        </div>
      </div>
    </div>
  );
}
