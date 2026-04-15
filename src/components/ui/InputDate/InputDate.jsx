import { TextField } from "@mui/material";
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

const InputDate = forwardRef(
  (
    {
      label = "Data de nascimento",
      error = false,
      helperText,
      value,
      onChange,
      sx = {},
      required = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    return (
      <TextField
        label={label}
        type="date"
        fullWidth
        error={error}
        helperText={helperText}
        value={value || ""}
        onChange={onChange}
        required={required}
        disabled={disabled}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        sx={fieldSx(error, sx)}
        ref={ref}
        {...props}
      />
    );
  }
);

InputDate.displayName = "InputDate";

InputDate.propTypes = {
  label: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  sx: PropTypes.object,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  props: PropTypes.object,
};

export default InputDate;
