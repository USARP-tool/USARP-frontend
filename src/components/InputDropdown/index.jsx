import styles from "./styles.module.scss";
import PropTypes from "prop-types";
export default function InputDropdown({
  label,
  registerName,
  register,
  data,
  children,
  ...rest
}) {
  return (
    <fieldset {...rest} className={styles.InputDropdown}>
      <label htmlFor="">{label}</label>
      <select {...register(registerName)} required={rest.required}>
        <option value="" disabled hidden>
          Escolher...
        </option>
        {data.map((item) => {
          return (
            <option key={item.label} aria-label={item.label} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </select>
      {children}
    </fieldset>
  );
}

InputDropdown.propTypes = {
  label: PropTypes.node.isRequired,
  registerName: PropTypes.node.isRequired,
  register: PropTypes.func,
  children: PropTypes.node,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
