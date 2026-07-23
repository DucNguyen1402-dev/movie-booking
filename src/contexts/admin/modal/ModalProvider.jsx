import { useState } from "react";

import {modalContext} from "./ModalContext"

export function ModalProvider({ children }) {
  const [modal, setModal] = useState({
    type: null,
    onConfirm: null,
    onCancel: null,
    title: "",
    subtitle: "",
  });

  const open = ({ type, onConfirm, title, subtitle, onCancel }) =>
    setModal({ type, onConfirm, title, subtitle, onCancel });
  const close = () =>
    setModal({ type: null, onConfirm: null, title: "", subtitle: "" });

  const value = {
    open,
    close,
    modal,
    setModal,
  };

  return (
    <modalContext.Provider value={value}>{children}</modalContext.Provider>
  );
}
