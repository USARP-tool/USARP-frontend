import { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

import { COLORSLEVEL, PASSWORD_STRENGTH } from "../../data/constants";

const PwStrengthLevel = ({ password = "" }) => {
  const { level, activeBars } = useMemo(() => {
    let score = 0;

    if (password) {
      for (const regex of Object.values(PASSWORD_STRENGTH)) {
        if (regex.test(password)) {
          score++;
        }
      }
    }

    if (score === 1) {
      return { level: "LOW", activeBars: 1 };
    }
    if (score >= 2 && score <= 4) {
      return { level: "MEDIUM", activeBars: 2 };
    }
    if (score === 5) {
      return { level: "HIGH", activeBars: 3 };
    }

    return { level: "EMPTY", activeBars: 0 };
  }, [password]);

  return (
    <div className={styles.levels}>
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className={styles.bar}
          style={{
            backgroundColor: index < activeBars ? COLORSLEVEL[level] : COLORSLEVEL.EMPTY,
            borderRadius: "30px",
          }}
        />
      ))}
    </div>
  );
};

PwStrengthLevel.propTypes = {
  password: PropTypes.string.isRequired,
};

export default PwStrengthLevel;
