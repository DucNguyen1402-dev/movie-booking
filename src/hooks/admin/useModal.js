import { useState } from "react";

export function useModal() {
  const [modal, setModal] = useState({ type: null, onConfirm: null });

  const open = ({ type, onConfirm }) => setModal({ type, onConfirm });
  const close = () => setModal({ type: null, onConfirm: null });

  return {
    open,
    close,
    modal,
    setModal,
  };
}
