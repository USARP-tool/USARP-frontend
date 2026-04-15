import PropTypes from "prop-types";

export function ButtonText({ children, ...rest }) {
  return <span {...rest}>{children}</span>;
}

ButtonText.propTypes = {
  children: PropTypes.node.isRequired,
};
