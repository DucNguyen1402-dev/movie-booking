import {
  useNotificationActions,
  useNotificationEffects,
  useNotificationStates,
} from "./hooks";
import { notificationContext } from "./notificationContext";

const NotificationProvider = ({ children }) => {
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
    ref: notificationRef,
    message: notification.message,
    variant: notification.variant,
    isOpen: notification.isOpen,
    notificationActions,
  };

  return (
    <notificationContext.Provider value={value}>
      {children}
    </notificationContext.Provider>
  );
};

export default NotificationProvider;
