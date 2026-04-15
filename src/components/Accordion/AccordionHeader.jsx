import { ChevronDown } from "lucide-react";
import { Text } from "../Text";
import styles from "./styles.module.scss";
import { useContext } from "react";
import { AccordionContext } from "./AccordionRoot";
export function AccordionHeader({ children, index }) {
  const { activeIndex, toggleIndex } = useContext(AccordionContext);

  const handleSelectItem = () => {
    toggleIndex(index);
  };

  const isOpen = activeIndex === index;
  return (
    <div className={styles.accordion__header + ` ${isOpen ? styles.active : ""}`} onClick={handleSelectItem}>
      <Text.Root>
        <Text.Body data-type={"small"}>
          <span className={styles.item__title}>{children}</span>
        </Text.Body>
      </Text.Root>
      <span className={styles.icon}>
        <ChevronDown />
      </span>
    </div>
  );
}
