import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import { useRef, forwardRef, useEffect } from "react";
import { Controller } from "react-hook-form";
// eslint-disable-next-line react/display-name
const InputTextareaRoot = forwardRef(({ children, ...rest }, ref) => {
  const textareaRef = useRef(null);
  
  const handleInput = () => {
    const textarea = textareaRef.current;
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
  };

  useEffect(() => {
    handleInput();
  }, [rest]); 
  
  return (
    <>
      <Controller
        {...rest}
        render={({ field }) => (
          <textarea
            {...field}
            ref={mergeRefs(ref, field.ref, textareaRef)}
            onInput={handleInput}
            className={styles.inputTextarea__container}
          />
        )}
      />
      {children}
    </>
  );
});

InputTextareaRoot.propTypes = {
  children: PropTypes.node,
};

export default InputTextareaRoot;

function mergeRefs(...refs) {
  return (element) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    });
  };
}
