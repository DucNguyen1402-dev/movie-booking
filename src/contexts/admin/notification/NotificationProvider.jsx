import { notificationIcons } from "@config/admin/notification/icons";
import { notificationStyles } from "@config/admin/notification/styles";

import {
  useNotificationActions,
  useNotificationEffects,
  useNotificationStates,
} from "./hooks";
import { notificationContext } from "./notificationContext";

export function NotificationProvider({ children }) {
  const { notification, dispatch, notificationRef, timeoutRef } =
    useNotificationStates();

  const notificationActions = useNotificationActions({
    dispatch,
    timeoutRef,
  });

  useNotificationEffects({
    notificationRef,
    hideNotification: notificationActions.hide,
  });

  const value = {
    notificationRef,
    ui: {
      styles: notificationStyles[notification.variant] ?? "",
      Icon: notificationIcons[notification.variant] ?? "span",
      message: notification.message,
    },
    isOpen: notification.isOpen,
    notificationActions,
  };

  return (
    <notificationContext.Provider value={value}>
      {children}
    </notificationContext.Provider>
  );
}

