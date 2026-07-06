export function useNotificationActions({ dispatch, timeoutRef }) {
  const showNotification = ({ variant, message }) => {
    dispatch({ type: "SHOW_NOTIFICATION", payload: { variant, message } });

    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      dispatch({ type: "HIDE_NOTIFICATION" });
    }, 2500);
  };

  const hideNotification = () => dispatch({ type: "SHOW_NOTIFICATION" });

  return {
    showNotification,
    hideNotification,
  };
}
