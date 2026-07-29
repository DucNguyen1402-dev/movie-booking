import { TOAST_VARIANT } from "@shared/toast";

export const warningToastContent = (message) => ({
  variant: TOAST_VARIANT.WARNING,
  message,
});
