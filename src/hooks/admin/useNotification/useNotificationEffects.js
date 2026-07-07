import { useEffect } from "react";

export function useNotificationEffects({ notificationRef , dispatch}) {
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        dispatch({ type: "HIDE_NOTIFICATION" });
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
}
