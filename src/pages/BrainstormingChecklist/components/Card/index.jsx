import { Text } from "../../../../components/Text";
import styles from "./styles.module.scss";
export default function Card({
  category,
  description,
  context,
  id,
  isChecked,
}) {
  // TODO: Implementar lógica para exibir ícones
  return (
    <div className={isChecked ? styles.card__container__checked : ""}>
      <div className={styles.card__container}>
        <div className={styles.card__header}>
          <Text.Root>
            <Text.Headline as={"h6"}>{category}</Text.Headline>
          </Text.Root>
        </div>
        <div className={styles.card__content}>
          <div className={styles.card__content__item}>
            <Text.Root>
              <Text.Caption className={styles.card__content__item__caption}>
                Descrição
              </Text.Caption>
            </Text.Root>
            <Text.Root>
              <Text.Body className={styles.card__content__item__body}>
                {description}
              </Text.Body>
            </Text.Root>
          </div>
          <div className={styles.card__content__item}>
            <Text.Root>
              <Text.Caption className={styles.card__content__item__caption}>
                Contexto
              </Text.Caption>
            </Text.Root>
            <Text.Root>
              <Text.Body className={styles.card__content__item__body}>
                {context}
              </Text.Body>
            </Text.Root>
          </div>
        </div>
        <div className={styles.card__footer}>
          <div className={styles.card__dot}>
            <span>i</span>
            <span>D</span>
          </div>
          <div className={styles.card__dot}>
            <Text.Root>
              <Text.Body className={styles.card__id}>{id}</Text.Body>
            </Text.Root>
          </div>
        </div>
      </div>
    </div>
  );
}
