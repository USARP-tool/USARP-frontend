import { createContext, useState } from "react";
import styles from "./styles.module.scss";

export const AccordionContext = createContext();

export function AccordionRoot({ children, defaultIndex }) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const toggleIndex = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };
  return (
    <AccordionContext.Provider value={{ activeIndex, toggleIndex }}>
      <div className={styles.accordion__container}>{children}</div>
    </AccordionContext.Provider>
  );
}
