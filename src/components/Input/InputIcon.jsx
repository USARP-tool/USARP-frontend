import styles from "./styles.module.scss";
// import PropTypes from "prop-types";
export default function InputIcon() {
  return (
    <fieldset className={styles.Input}>
      <input type="text" />
      <span>Campo vazio</span>
    </fieldset>
  );
}
