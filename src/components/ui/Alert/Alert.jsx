import MuiAlert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import PropTypes from "prop-types";

const Alert = ({ severity, title, text, onClose }) => {
  return (
    <MuiAlert variant="filled" severity={severity} onClose={onClose}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {text}
    </MuiAlert>
  );
};

Alert.propTypes = {
  severity: PropTypes.oneOf(["success", "info", "warning", "error"]).isRequired,
  title: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

export default Alert;
