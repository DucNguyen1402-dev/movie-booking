import { TOAST_VARIANT } from "@shared/overlays/toast/constants";

export const warningToast = (message) => ({
  variant: TOAST_VARIANT.WARNING,
  message,
});
