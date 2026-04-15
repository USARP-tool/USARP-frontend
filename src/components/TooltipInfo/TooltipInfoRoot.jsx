import { useRef } from "react";
import { IconChoice } from "../../utils/IconChoice";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";
export function TooltipInfoRoot({ children, text,...rest }) {
  const tooltipRef = useRef(null);

  const showTooltip = () => {
    tooltipRef.current.style.opacity = "1";
    tooltipRef.current.style.pointerEvents = "auto";
  };

  const hideTooltip = () => {
    tooltipRef.current.style.opacity = "0";
    tooltipRef.current.style.pointerEvents = "none";
  };

  return (
    <div className={styles.tooltipinfo__container}>
      {children}
      <button
        {...rest}
        type="button"
        className={styles.tooltipinfo__button}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        <IconChoice icon="information" />
      </button>
      <div className={styles.tooltip} ref={tooltipRef}>
        {text}
      </div>
    </div>
  );
}
TooltipInfoRoot.propTypes = {
  children: PropTypes.node,
  text: PropTypes.string,
};
