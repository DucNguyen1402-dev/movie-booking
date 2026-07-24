import { useCallback, useMemo, useState } from "react";

import { modalContext } from "./ModalContext";

export function ModalProvider({ children }) {
  const [modal, setModal] = useState({
    type: null,
    onConfirm: null,
    onCancel: null,
    title: "",
    subtitle: "",
  });

  const open = useCallback(
    ({ type, onConfirm, title, subtitle, onCancel }) =>
      setModal({ type, onConfirm, title, subtitle, onCancel }),
    [],
  );

  const close = useCallback(
    () => setModal({ type: null, onConfirm: null, title: "", subtitle: "" }),
    [],
  );

  const value = useMemo(
    () => ({
      open,
      close,
      modal,
      setModal,
    }),
    [open, close, modal, setModal],
  );

  return (
    <modalContext.Provider value={value}>{children}</modalContext.Provider>
  );
}
