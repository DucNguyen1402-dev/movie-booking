import { useCallback, useMemo, useState } from "react";

import { ModalContext } from "./ModalContext";

const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null,
    title: "",
    subtitle: "",
    onConfirm: null,
    onCancel: null,
    content: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = useCallback(() => setIsLoading(true), []);

  const open = useCallback(
    ({ type, onConfirm, title, subtitle, onCancel }) =>
      setModalState({
        type,
        onConfirm,
        title,
        subtitle,
        onCancel,
        isOpen: true,
      }),
    [],
  );

  const closeModal = useCallback(() => {
    setModalState({
      type: null,
      onConfirm: null,
      title: "",
      subtitle: "",
      loading: false,
      onCancel: null,
      entity: null,
      isOpen: false,
    });
    setIsLoading(false);
  }, []);

  const value = useMemo(
    () => ({
      open,
      close: closeModal,
      internal: {
        state: {
          modalState,
          isLoading,
        },
        actions: {
          startLoading,
          closeModal,
        },
      },
    }),
    [open, modalState, isLoading, startLoading, closeModal],
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export default ModalProvider;
