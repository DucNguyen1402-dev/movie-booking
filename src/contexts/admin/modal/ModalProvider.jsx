import { useCallback, useMemo, useState } from "react";

import { modalContext } from "./ModalContext";

const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({
    type: null,
    onConfirm: null,
    onCancel: null,
    title: "",
    subtitle: "",
    loading: false,
  });

  const startLoading = useCallback(
    () => setModal((prev) => ({ ...prev, loading: true })),
    [],
  );
  const open = useCallback(
    ({ type, onConfirm, title, subtitle, onCancel }) =>
      setModal({ type, onConfirm, title, subtitle, onCancel }),
    [],
  );

  const close = useCallback(
    () =>
      setModal({
        type: null,
        onConfirm: null,
        title: "",
        subtitle: "",
        loading: false,
        onCancel: null,
      }),
    [],
  );

  const handleConfirmAction = useCallback(() => {
    if (!modal.onConfirm) return;
    startLoading();
    modal.onConfirm();
  }, [modal, startLoading]);

  const value = useMemo(
    () => ({
      open,
      close,
      modal,
      setModal,
      startLoading,
      handleConfirmAction,
    }),
    [open, close, modal, setModal, handleConfirmAction, startLoading],
  );

  return (
    <modalContext.Provider value={value}>{children}</modalContext.Provider>
  );
};

export default ModalProvider;
