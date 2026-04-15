import PropTypes from "prop-types";
import styles from "./styles.module.scss";

const Container = ({ children, isFlex = false, gap, fullScreen = false, className = "", ...props }) => {
  const containerClasses = [
    styles.container,
    isFlex ? styles.flexColumn : "",
    fullScreen ? styles.minHeightScreen : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses} style={gap ? { gap: gap } : {}} {...props}>
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  isFlex: PropTypes.bool,
  gap: PropTypes.string,
  fullScreen: PropTypes.bool,
  className: PropTypes.string,
};

export default Container;
