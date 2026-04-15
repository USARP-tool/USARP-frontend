import style from "./styles.module.scss";
import PropTypes from "prop-types";

export function ModalText({ title, description }) {
  return (
    <div className={style.ReactModal__Text}>
      <h6>{title}</h6>
      <p>{description}</p>
    </div>
  )
}

ModalText.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
}