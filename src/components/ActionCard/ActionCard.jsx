import PropTypes from "prop-types";
import styles from "./styles.module.scss";

export function ActionCard({ image, alt, label, onClick, variant = "primary", disabled = false }) {
  const variantClass = variant === "secondary" ? styles.secondary : styles.primary;

  return (
    <button
      className={`${styles.card} ${variantClass}`}
      onClick={onClick}
      type="button"
      disabled={disabled}
    >
      <img src={image} alt={alt} />
      <span className={styles.label}>{label}</span>
    </button>
  );
}

ActionCard.propTypes = {
  image: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  alt: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["primary", "secondary"]),
  disabled: PropTypes.bool,
};
