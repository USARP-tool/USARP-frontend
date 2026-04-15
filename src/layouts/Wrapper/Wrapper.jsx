import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import styles from "./styles.module.scss";

const Wrapper = ({
  children,
  className = "",
  sx = {},
  elevation = 1,
  variant = "elevation",
  autoWidth = false,
  ...rest
}) => {
  const cardStyles = autoWidth ? { ...sx } : { minWidth: 275, maxWidth: 600, ...sx };

  return (
    <Card className={`${styles.card} ${className}`} sx={cardStyles} elevation={elevation} variant={variant} {...rest}>
      {children}
    </Card>
  );
};

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  sx: PropTypes.object,
  elevation: PropTypes.number,
  variant: PropTypes.oneOf(["outlined", "elevation"]),
  autoWidth: PropTypes.bool,
};

export default Wrapper;
