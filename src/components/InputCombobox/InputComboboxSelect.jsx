import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import Select from "react-select";
import styles from "./styles.module.scss";
import { IconChoice } from "../../utils/IconChoice";

export default function InputComboboxSelect({ children, options, error, ...rest }) {

  const CustomDropdownIndicator = ({ selectProps: { menuIsOpen } }) => (
    <div className={styles.custom_indicator}>
      <IconChoice icon={menuIsOpen ? "arrowup" : "arrowdown"} />
    </div>
  );

  CustomDropdownIndicator.propTypes = {
    selectProps: PropTypes.shape({
      menuIsOpen: PropTypes.bool,
    }).isRequired,
  };

  return (
    <>
      <Controller
        {...rest}
        render={({ field }) => (
          <Select
            {...field}
            className={styles.custom_select}
            classNamePrefix="react_select"
            options={options}
            value={
              field.value
                ? options.find(
                    (opt) =>
                      opt.value === field.value ||
                      opt.label === field.value ||
                      JSON.stringify(opt) === JSON.stringify(field.value)
                  )
                : null
            }
            isClearable
            placeholder={rest.placeholder}
            components={{
              DropdownIndicator: CustomDropdownIndicator,
              IndicatorSeparator: () => null,
              ClearIndicator: () => null,
            }}
            styles={{
              control: (provided) => ({
                ...provided,
                border: error
                  ? "none !important"
                  : "0.06rem solid var(--th-combobox-border)",
                outline: error
                  ? "0.06rem solid var(--th-combobox-error)"
                  : "none",
                placeContent: "center",
                height: rest.height || "3.5rem",
              }),
              option: (provided) => ({
                ...provided,
                backgroundColor: "transparent",
                color: "var(--th-input-color)",
                "&:hover": {
                  backgroundColor: "var(--th-combobox-hover)",
                },
              }),
            }}
          />
        )}
      />
      {children}
    </>
  );
}

InputComboboxSelect.propTypes = {
  children: PropTypes.node,
  error: PropTypes.any,
  options: PropTypes.any.isRequired,
};
