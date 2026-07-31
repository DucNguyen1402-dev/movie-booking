import {
  messageClasses,
  toastIconSizes,
  toastIconTypes,
  toastSizeClasses,
  toastTypeClasses,
} from "@shared/overlays/toast/config";
import { cn } from "@shared/utils";
const ToastContainer = ({
  message = "something went wrong",
  variant,
  toastRef,
  size = "md",
}) => {
  if (import.meta.env.DEV && !(variant in toastTypeClasses)) {
    console.warn(`Unknown toast variant: "${variant}"`);
  }

  const toastSize = toastSizeClasses[size];
  const typeClass = toastTypeClasses[variant] ?? toastTypeClasses.system;

  const Icon = toastIconTypes[variant];
  const iconSize = toastIconSizes[size];
  const messageSize = messageClasses[size];
  return (
    <div ref={toastRef} className={cn("toast", typeClass, toastSize)}>
      <Icon className={cn("text-white", iconSize)} />

      <p className={cn("flex-1 font-medium", messageSize)}>{message}</p>
    </div>
  );
};
ToastContainer.displayName = "ToastContainer";
export default ToastContainer;
