import { useState, useCallback } from "react";

const useModal = () => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: "success",
    title: "",
    text: "",
    buttonText: "",
    onButtonClick: null,
    autoCloseDuration: 0,
  });

  const openModal = useCallback((options) => {
    setModalState({
      isOpen: true,
      ...options,
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  return {
    modalProps: modalState,
    openModal,
    closeModal,
  };
};

export default useModal;
