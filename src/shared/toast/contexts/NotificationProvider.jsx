import {
  useNotificationActions,
  useNotificationEffects,
  useNotificationStates,
} from "./hooks";
import { notificationContext } from "./NotificationContext";

const NotificationProvider = ({ children }) => {
  const {
    isOpen,
    variant,
    message,
    notificationRef,
    timeoutRef,
    setNotification,
  } = useNotificationStates();

  const { show, hide } = useNotificationActions({
    timeoutRef,
    setNotification,
  });

  useNotificationEffects({
    notificationRef,
    hideNotification: hide,
  });

  const value = {
    state: {
      ref: notificationRef,
      message,
      variant,
      isOpen,
    },
    show,
    hide,
  };

  return (
    <notificationContext.Provider value={value}>
      {children}
    </notificationContext.Provider>
  );
};

export default NotificationProvider;
