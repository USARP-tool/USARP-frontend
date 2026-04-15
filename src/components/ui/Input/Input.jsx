import { useState, forwardRef } from "react";
import PropTypes from "prop-types";
import { TextField, IconButton, InputAdornment, FormControl } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const baseSx = (error = false, extra = {}, multiline = false) => ({
  "& .MuiOutlinedInput-root": {
    padding: multiline ? "1rem" : undefined,
    "&.Mui-focused fieldset": { borderColor: error ? "red" : "var(--th-color-input-focus)" },
    "&.Mui-error fieldset": { borderColor: "red", borderWidth: "2px" },
    "&:hover fieldset": { borderColor: error ? "red" : "var(--th-color-input-hover)" },
    "& fieldset": { borderRadius: "1rem" },
  },
  "& .MuiInputBase-input": {
    padding: multiline ? "0" : "1rem",
    fontSize: "0.875rem",
  },
  "& .MuiInputLabel-root": {
    "&.Mui-focused": { color: error ? "red" : "var(--th-color-input-focus)" },
    "&.Mui-error": { color: "red" },
  },
  "& .MuiFormHelperText-root": { "&.Mui-error": { color: "red", fontSize: "0.9rem" } },
  ...extra,
});

const Input = forwardRef(
  (
    {
      name,
      label,
      type = "text",
      placeholder,
      required = false,
      error = false,
      helperText = "",
      minLength,
      maxLength,
      autoFocus = false,
      disabled = false,
      sx = {},
      onChange,
      onBlur,
      value,
      showPasswordToggle = false,
      variant = "outlined",
      multiline = false,
      rows = 1,
      ...otherProps
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const inputType = showPasswordToggle && type === "password" ? (showPassword ? "text" : "password") : type;

    const getEndAdornment = () => {
      if (showPasswordToggle && type === "password") {
        return (
          <InputAdornment position="end">
            <IconButton
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        );
      }
      return null;
    };

    const htmlInputProps = { minLength, maxLength, ...otherProps.htmlInputProps };

    return (
      <FormControl fullWidth error={error} disabled={disabled}>
        <TextField
          ref={ref}
          name={name}
          label={label}
          type={inputType}
          placeholder={placeholder}
          required={required}
          error={error}
          helperText={helperText}
          autoFocus={autoFocus}
          disabled={disabled}
          variant={variant}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          sx={baseSx(error, sx, multiline)}
          multiline={multiline}
          rows={rows}
          slotProps={{
            htmlInput: htmlInputProps,
            input: { endAdornment: getEndAdornment(), ...otherProps.slotProps?.input },
          }}
          {...otherProps}
        />
      </FormControl>
    );
  }
);

Input.displayName = "Input";

Input.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  sx: PropTypes.object,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.any,
  showPasswordToggle: PropTypes.bool,
  variant: PropTypes.string,
  htmlInputProps: PropTypes.object,
  multiline: PropTypes.bool,
  rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Input;
