import { useContext, useRef } from "react";
import { AccordionContext } from "./AccordionRoot";
import styles from "./styles.module.scss";

export function AccordionContent({ children, index }) {
  const { activeIndex, toggleIndex } = useContext(AccordionContext);

  const contentHeight = useRef();

  const isOpen = activeIndex === index;
  return (
    <div
      ref={contentHeight}
      className={
        styles.accordion__content__container + ` ${isOpen ? styles.active : ""}`
      }
      style={
        isOpen
          ? { height: contentHeight.current?.scrollHeight }
          : { height: "0px" }
      }
    >
      <div className={styles.content}>{children}</div>
    </div>
  );
}
