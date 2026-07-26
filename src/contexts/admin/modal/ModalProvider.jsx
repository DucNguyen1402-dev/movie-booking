import { useCallback, useMemo, useState } from "react";

import { modalContext } from "./ModalContext";

const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({
    type: null,
    onConfirm: null,
    onCancel: null,
    defaultTitle: "Xác nhận?",
    defaultSubtitle: "",
    content: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = useCallback(() => setIsLoading(true), []);
  const stopLoading = () => setIsLoading(false);

  const open = useCallback(
    ({ type, onConfirm, title, subtitle, onCancel, content }) =>
      setModal({ type, onConfirm, title, subtitle, onCancel, content }),
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
      entity: null,
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
