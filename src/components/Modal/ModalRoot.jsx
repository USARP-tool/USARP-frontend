import PropTypes from "prop-types";
import style from "./styles.module.scss";
import ReactModal from 'react-modal';

export function ModalRoot({ isOpen, children }) {
  return (
    <ReactModal isOpen={isOpen} appElement={document.body} className={style.ReactModal__Overlay}>
      <div className={style.ReactModal__Content}>
        { children }
      </div>
    </ReactModal>
  )
}

ModalRoot.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  isOpen: PropTypes.bool
}