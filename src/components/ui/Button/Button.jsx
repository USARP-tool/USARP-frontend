import PropTypes from "prop-types";
import MuiButton from "@mui/material/Button";

const fieldSx = (fullWidth, variant, extra = {}) => ({
  display: "flex",
  width: fullWidth ? "100%" : "auto",
  padding: "0.75rem",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.5rem",
  fontSize: "1rem",
  borderRadius: "1rem",
  border: "1px solid var(--th-color-button)",
  background: "var(--th-color-button)",
  color: "var(--th-color-text-button)",
  cursor: "pointer",
  textTransform: "none",
  fontWeight: "normal",

  "&:hover": {
    backgroundColor: "var(--th-color-button-hover)",
    borderColor: "var(--th-color-button-hover)",
  },

  "&:focus": {
    outline: "2px solid var(--th-color-button-focus)",
    outlineOffset: "2px",
  },

  "&:disabled": {
    backgroundColor: "var(--th-color-button-disabled)",
    color: "var(--th-color-text-button-disabled)",
    cursor: "not-allowed",
    border: "1px solid var(--th-color-button-disabled)",
  },

  ...(variant === "outlined" && {
    backgroundColor: "transparent",
    border: "2px solid var(--th-color-button)",
    color: "var(--th-color-button)",

    "&:hover": {
      backgroundColor: "var(--th-color-button-hover)",
      color: "var(--th-color-text-button)",
    },

    "&:disabled": {
      borderColor: "var(--th-color-button-disabled)",
      color: "var(--th-color-button-disabled)",
      backgroundColor: "transparent",
    },
  }),

  ...(variant === "text" && {
    backgroundColor: "transparent",
    border: "none",
    color: "var(--th-color-button)",

    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },

    "&:disabled": {
      color: "var(--th-color-button-disabled)",
      backgroundColor: "transparent",
    },
  }),
  ...extra,
});

const Button = ({
  children,
  icon,
  iconPosition = "start",
  variant = "contained",
  disabled = false,
  type = "button",
  fullWidth = true,
  onClick,
  sx = {},
  ...props
}) => {
  return (
    <MuiButton type={type} onClick={onClick} disabled={disabled} sx={fieldSx(fullWidth, variant, sx)} {...props}>
      {iconPosition === "start" && icon}
      {children}
      {iconPosition === "end" && icon}
    </MuiButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.element,
  iconPosition: PropTypes.oneOf(["start", "end"]),
  variant: PropTypes.oneOf(["contained", "outlined", "text"]),
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  sx: PropTypes.object,
};

export default Button;
