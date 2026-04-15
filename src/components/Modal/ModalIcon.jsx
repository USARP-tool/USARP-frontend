import style from "./styles.module.scss";
import PropTypes from "prop-types";
import { IconChoice } from "../../utils/IconChoice";

export function ModalIcon({ icon, color }) {
  return (
    <div className={style.ReactModal__Icon}>
      <IconChoice icon={icon} color={color} />
    </div>
  )
}

ModalIcon.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string
}
