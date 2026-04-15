import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";

const fieldSx = (color, underline, bold, extra = {}) => ({
  fontSize: "0.875rem",
  alignSelf: "flex-end",
  color: "var(--th-color-text-link)",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: "0.25rem",
  fontWeight: bold ? "bold" : "normal",
  transition: "all 0.2s ease-in-out",

  "&:hover": {
    color: "var(--th-color-text-link-focus)",
    textDecoration: underline === "hover" ? "underline" : "none",
    transform: "translateY(-1px)",
  },

  "&:focus": {
    outline: "2px solid var(--th-color-text-link-focus)",
    outlineOffset: "2px",
    borderRadius: "0.25rem",
  },

  "&:active": {
    transform: "translateY(0)",
  },

  ...(color === "primary" && {
    color: "var(--th-color-text-link)",
    "&:hover": {
      color: "var(--th-color-text-link-focus)",
    },
  }),

  ...(color === "secondary" && {
    color: "var(--th-color-text-link)",
    "&:hover": {
      color: "var(--th-color-text-link-focus)",
    },
  }),

  ...extra,
});

const Link = ({
  to = "#",
  href,
  children,
  bold = false,
  underline = "none",
  color = "primary",
  external = false,
  onClick,
  sx = {},
  ...props
}) => {
  return (
    <RouterLink to={to} target={external ? "_blank" : ""} {...props} href={href ? href : ""}>
      <Typography component="span" onClick={onClick} sx={fieldSx(color, underline, bold, sx)}>
        {children}
      </Typography>
    </RouterLink>
  );
};

Link.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
  icon: PropTypes.element,
  iconPosition: PropTypes.oneOf(["start", "end"]),
  bold: PropTypes.bool,
  underline: PropTypes.oneOf(["none", "hover", "always"]),
  color: PropTypes.oneOf(["primary", "secondary"]),
  external: PropTypes.bool,
  onClick: PropTypes.func,
  sx: PropTypes.object,
};

export default Link;
