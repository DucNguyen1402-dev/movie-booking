import {
  messageClasses,
  notificationIconSizes,
  notificationIconTypes,
  notificationSizeClasses,
  notificationTypeClasses,
} from "@config/admin";

import { cn } from "@utils/shared";
const Notification = ({
  message = "something went wrong",
  variant,
  notificationRef,
  size = "md",
}) => {
  if (import.meta.env.DEV && !(variant in notificationTypeClasses)) {
    console.warn(`Unknown notification variant: "${variant}"`);
  }

  const notificationSize = notificationSizeClasses[size];
  const typeClass =
    notificationTypeClasses[variant] ?? notificationTypeClasses.system;

  const Icon = notificationIconTypes[variant];
  const iconSize = notificationIconSizes[size];
  const messageSize = messageClasses[size];
  return (
    <div
      ref={notificationRef}
      className={cn("notification", typeClass, notificationSize)}
    >
      <Icon className={cn("text-white", iconSize)} />

      <p className={cn("flex-1 font-medium", messageSize)}>{message}</p>
    </div>
  );
};
Notification.displayName = "Notification";
export default Notification;
