export function useNotificationActions({ dispatch, timeoutRef }) {
  const show = ({ variant, message }) => {
    dispatch({ type: "SHOW_NOTIFICATION", payload: { variant, message } });

    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      dispatch({ type: "HIDE_NOTIFICATION" });
    }, 2500);
  };

  const hide = () => dispatch({ type: "HIDE_NOTIFICATION" });

  return {
    show,
    hide,
  };
}
