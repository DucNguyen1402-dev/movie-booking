import { useEffect } from "react";

export function useToastEffect({ toastRef, hideToast, autoHideTimeoutRef }) {
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (toastRef.current && !toastRef.current.contains(e.target)) {
        hideToast();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [autoHideTimeoutRef, hideToast, toastRef]);
}
