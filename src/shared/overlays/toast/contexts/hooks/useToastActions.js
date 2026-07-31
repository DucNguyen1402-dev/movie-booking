import { useCallback, useMemo } from "react";

export function useToastActions({ autoHideTimeoutRef, setToast }) {
  const show = useCallback(
    ({ variant, message }) => {
      setToast({ isOpen: true, variant, message });

      clearTimeout(autoHideTimeoutRef.current);

      autoHideTimeoutRef.current = setTimeout(() => {
        setToast({
          isOpen: false,
          message: null,
          variant: null,
        });
      }, 2500);
    },
    [setToast, autoHideTimeoutRef],
  );

  const hide = useCallback(
    () =>
      setToast({
        isOpen: false,
        message: null,
        variant: null,
      }),
    [setToast],
  );

  return useMemo(
    () => ({
      show,
      hide,
    }),
    [show, hide],
  );
}
