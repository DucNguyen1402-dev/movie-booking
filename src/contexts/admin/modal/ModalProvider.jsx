import { useCallback, useMemo, useState } from "react";

import { modalContext } from "./ModalContext";

const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({
    type: null,
    onConfirm: null,
    onCancel: null,
    title: "",
    subtitle: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = useCallback(() => setIsLoading(true), []);
  const stopLoading = () => setIsLoading(false);

  const open = useCallback(
    ({ type, onConfirm, title, subtitle, onCancel }) =>
      setModal({ type, onConfirm, title, subtitle, onCancel }),
    [],
  );

  const close = useCallback(() => {
    setModal({
      type: null,
      onConfirm: null,
      title: "",
      subtitle: "",
      loading: false,
      onCancel: null,
    });
    stopLoading();
  }, []);

  const value = useMemo(
    () => ({
      open,
      close,
      modal,
      setModal,
      startLoading,
      isLoading,
    }),
    [open, close, modal, setModal, startLoading, isLoading],
  );

  return (
    <modalContext.Provider value={value}>{children}</modalContext.Provider>
  );
};

export default ModalProvider;
