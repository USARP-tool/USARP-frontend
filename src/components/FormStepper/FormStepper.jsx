import PropTypes from "prop-types";
import { Stepper, Step, StepLabel } from "@mui/material";
import styles from "./styles.module.scss";

const FormStepper = ({ activeStep = 0, steps = [] }) => {
  if (!Array.isArray(steps) || steps.length === 0) return null;

  return (
    <div className={styles.container}>
      <Stepper activeStep={activeStep} alternativeLabel className={styles.stepper}>
        {steps.map((label, index) => (
          <Step key={`${label}-${index}`}>
            <StepLabel className={styles.stepLabel}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

FormStepper.propTypes = {
  activeStep: PropTypes.number,
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default FormStepper;
