import { useContext, createContext } from "react";
import { notificationStyles } from "@config/admin/notification/styles";
import { notificationIcons } from "@config/admin/notification/icons";
import { useNotificationStates } from "@hooks/useNotification/useNotificationStates";
import { useNotificationEffects } from "@hooks/useNotification/useNotificationEffects";
import { useNotificationActions } from "@hooks/useNotification/useNotificationActions";

const notificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const { notification, dispatch, notificationRef, timeoutRef } =
    useNotificationStates();

  const notifActions = useNotificationActions({
    dispatch,
    timeoutRef,
  });

  useNotificationEffects({
    notificationRef,
    dispatch,
  });

  const value = {
    message: notification.message,
    notificationRef,
    styles: notificationStyles[notification.variant] ?? "",
    Icon: notificationIcons[notification.variant] ?? "span",
    isOpen: notification.isOpen,
    notifActions,
  };

  return (
    <notificationContext.Provider value={value}>
      {children}
    </notificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(notificationContext);

  if (!context) {
    throw new Error("useEditMovie must be used within EditProvider");
  }

  return context;
}
