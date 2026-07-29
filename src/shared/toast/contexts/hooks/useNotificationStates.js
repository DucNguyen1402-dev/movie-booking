import { useRef, useState } from "react";

export function useNotificationStates() {
  const [notification, setNotification] = useState({
    isOpen: false,
    message: null,
    variant: null,
  });

  const notificationRef = useRef(null);
  const timeoutRef = useRef(null);

  return {
    isOpen: notification.isOpen,
    message: notification.message,
    variant: notification.variant,
    notificationRef,
    timeoutRef,
    setNotification,
  };
}
