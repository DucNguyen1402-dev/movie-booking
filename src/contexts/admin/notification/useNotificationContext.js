import { useContext } from "react";
import { notificationContext } from "./notificationContext";

export function useNotificationContext() {
  const context = useContext(notificationContext);

  if (!context) {
    throw new Error("useNotificationContext must be used within NotificationProvider");
  }

  return context;
}
