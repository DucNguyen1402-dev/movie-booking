import { useToastActions, useToastEffect, useToastState } from "./hooks";
import { ToastContext } from "./ToastContext";

const ToastProvider = ({ children }) => {
  const { isOpen, variant, message, toastRef, autoHideTimeoutRef, setToast } =
    useToastState();

  const { show, hide } = useToastActions({
    autoHideTimeoutRef,
    setToast,
  });

  useToastEffect({
    toastRef,
    hideToast: hide,
    autoHideTimeoutRef,
  });

  const value = {
    state: {
      ref: toastRef,
      message,
      variant,
      isOpen,
    },
    show,
    hide,
  };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};

export default ToastProvider;
