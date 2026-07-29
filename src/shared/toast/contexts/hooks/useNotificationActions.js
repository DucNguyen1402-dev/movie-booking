import { useCallback, useMemo } from "react";

export function useNotificationActions({ timeoutRef, setNotification }) {
  const show = useCallback(
    ({ variant, message }) => {
      setNotification({ isOpen: true, variant, message });

      clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setNotification({
          isOpen: false,
          message: null,
          variant: null,
        });
      }, 2500);
    },
    [setNotification, timeoutRef],
  );

  const hide = useCallback(
    () =>
      setNotification({
        isOpen: false,
        message: null,
        variant: null,
      }),
    [setNotification],
  );

  return useMemo(
    () => ({
      show,
      hide,
    }),
    [show, hide],
  );
}
