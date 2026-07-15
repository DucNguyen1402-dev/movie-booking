import { useState } from "react";

export function useModal() {
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

  return {
    open,
    close,
    modal,
    setModal,
  };
}
