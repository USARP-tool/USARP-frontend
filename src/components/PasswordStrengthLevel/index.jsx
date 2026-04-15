import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import { IconChoice } from "../../utils/IconChoice";
export default function PasswordStrengthLevel({ password }) {
  const atLeastOneUppercase = /[A-Z]/g; // capital letters from A to Z
  const atLeastOneLowercase = /[a-z]/g; // small letters from a to z
  const atLeastOneNumeric = /[0-9]/g; // numbers from 0 to 9
  const atLeastOneSpecialChar = /[#?!@$%^&*-]/g; // any of the special characters within the square brackets
  const eightCharsOrMore = /.{8,}/g; // eight characters or more

  const passwordTracker = {
    uppercase: password.match(atLeastOneUppercase),
    lowercase: password.match(atLeastOneLowercase),
    number: password.match(atLeastOneNumeric),
    specialChar: password.match(atLeastOneSpecialChar),
    eightCharsOrGreater: password.match(eightCharsOrMore),
  };
  const passwordStrength = Object.values(passwordTracker).filter(
    (value) => value
  ).length;

  const colors = [
    {
      low: "#E0E0E0",
      midium: "#E0E0E0",
      high: "#E0E0E0",
    },
    {
      low: "#FFC53F",
      midium: "#E0E0E0",
      high: "#E0E0E0",
    },
    {
      low: "#FE6732",
      midium: "#FE6732",
      high: "#E0E0E0",
    },
    {
      low: "#33BDC3",
      midium: "#33BDC3",
      high: "#33BDC3",
    },
  ];

  const colorLevel = () => {
    if (passwordStrength === 0) {
      return colors[0];
    }
    if (passwordStrength >= 1 && passwordStrength < 3) {
      return colors[1];
    }
    if (passwordStrength >= 3 && passwordStrength <= 4) {
      return colors[2];
    }
    if (passwordStrength === 5) {
      return colors[3];
    }
  };

  return (
    <div hidden={!password.length} className={styles.dash}>
      <span className={styles.dash__container}>
        <IconChoice icon="dash" color={colorLevel().low} />
        <IconChoice icon="dash" color={colorLevel().midium} />
        <IconChoice icon="dash" color={colorLevel().high} />
      </span>
      <p>Senha média</p>
    </div>
  );
}

PasswordStrengthLevel.propTypes = {
  password: PropTypes.string.isRequired,
};
