import { Select as SelectMUI, MenuItem, FormControl, InputLabel } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef } from "react";

const fieldSx = (error = false, extra = {}) => ({
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: error ? "red" : "var(--th-color-input-focus)",
    },
    "&.Mui-error fieldset": {
      borderColor: "red",
      borderWidth: "2px",
    },
    "&:hover fieldset": {
      borderColor: error ? "red" : "var(--th-color-input-hover)",
    },
    "& fieldset": {
      borderRadius: "1rem",
    },
  },
  "& .MuiInputBase-input": {
    padding: "1rem",
    fontSize: "0.875rem",
  },
  "& .MuiInputLabel-root": {
    "&.Mui-focused": {
      color: error ? "red" : "var(--th-color-input-focus)",
    },
    "&.Mui-error": {
      color: "red",
    },
  },
  "& .MuiFormHelperText-root": {
    "&.Mui-error": {
      color: "red",
      fontSize: "0.9rem",
    },
  },
  ...extra,
});

const Select = forwardRef(
  (
    {
      label = "Selecione",
      value = "",
      onChange,
      options = [],
      error = false,
      helperText,
      required = false,
      disabled = false,
      fullWidth = true,
      ...props
    },
    ref
  ) => {
    const labelId = `select-label-${label.replace(/\s+/g, "-").toLowerCase()}`;
    const selectId = `select-${label.replace(/\s+/g, "-").toLowerCase()}`;

    return (
      <FormControl fullWidth={fullWidth} error={error} sx={fieldSx(error)}>
        <InputLabel id={labelId} shrink={true}>
          {label}
          {required && " *"}
        </InputLabel>
        <SelectMUI
          labelId={labelId}
          id={selectId}
          value={value}
          label={label}
          onChange={onChange}
          required={required}
          disabled={disabled}
          displayEmpty
          slotProps={{
            input: {
              sx: {
                padding: "1rem",
                fontSize: "0.875rem",
                borderRadius: "1rem",
              },
            },
          }}
          ref={ref}
          {...props}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value} sx={{ fontSize: "0.875rem", padding: "0.75rem 1rem" }}>
              {option.label}
            </MenuItem>
          ))}
        </SelectMUI>
        {helperText && (
          <div
            style={{
              color: error ? "red" : "rgba(0, 0, 0, 0.6)",
              fontSize: "0.75rem",
              marginLeft: "14px",
              marginRight: "14px",
              marginTop: "3px",
            }}
          >
            {helperText}
          </div>
        )}
      </FormControl>
    );
  }
);

Select.displayName = "Select";

Select.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  props: PropTypes.object,
};

export default Select;
