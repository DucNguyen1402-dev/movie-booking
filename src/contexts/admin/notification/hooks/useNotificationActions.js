import { useCallback, useMemo } from "react";

export function useNotificationActions({ dispatch, timeoutRef }) {
  const show = useCallback(
    ({ variant, message }) => {
      dispatch({ type: "SHOW_NOTIFICATION", payload: { variant, message } });

      clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        dispatch({ type: "HIDE_NOTIFICATION" });
      }, 2500);
    },
    [dispatch, timeoutRef],
  );

  const hide = useCallback(
    () => dispatch({ type: "HIDE_NOTIFICATION" }),
    [dispatch],
  );

  return useMemo(
    () => ({
      show,
      hide,
    }),
    [show, hide],
  );
}
