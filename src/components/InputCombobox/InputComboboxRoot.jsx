import PropTypes from "prop-types";

export default function InputComboboxRoot({ children}) {
  return (
    <>
      {children}
    </>
  );
}

InputComboboxRoot.propTypes = {
  children: PropTypes.node,
};
