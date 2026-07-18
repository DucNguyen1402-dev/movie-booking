import { useState } from "react";

export function useModal() {
  const [modal, setModal] = useState({
    type: null,
    onConfirm: null,
    title: "",
    subtitle: "",
  });

  const open = ({ type, onConfirm, title, subtitle }) =>
    setModal({ type, onConfirm, title, subtitle });
  const close = () =>
    setModal({ type: null, onConfirm: null, title: "", subtitle: "" });

  return {
    open,
    close,
    modal,
    setModal,
  };
}
