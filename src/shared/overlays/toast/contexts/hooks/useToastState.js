import { useRef, useState } from "react";

export function useToastState() {
  const [toast, setToast] = useState({
    isOpen: false,
    message: null,
    variant: null,
  });

  const toastRef = useRef(null);
  const autoHideTimeoutRef = useRef(null);

  return {
    isOpen: toast.isOpen,
    message: toast.message,
    variant: toast.variant,
    toastRef,
    autoHideTimeoutRef,
    setToast,
  };
}
