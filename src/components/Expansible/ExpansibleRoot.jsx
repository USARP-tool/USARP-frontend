import { useState } from "react";
import { IconChoice } from "../../utils/IconChoice";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";
export default function ExpansibleRoot({ children, usNumber, close, ...rest }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  return (
    <div
      className={`${styles.expansible__container} ${
        expanded ? styles.expanded : ""
      }`}
    >
      <div className={styles.expansible__body} {...rest}>
        <div className={styles.expansible__detail} onClick={toggleExpanded}>
          <IconChoice icon="arrow" />
          <span>US{usNumber}</span>
        </div>
        <div className={styles.expansible__close} title="Fecha">
          <IconChoice icon="delete" onClick={close} />
        </div>
      </div>
      {expanded && children}
    </div>
  );
}

ExpansibleRoot.propTypes = {
  children: PropTypes.node,
  usNumber: PropTypes.string,
  close: PropTypes.func,
};
