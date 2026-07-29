import { TOAST_VARIANT } from "@shared/toast";

export const errorToastContent = (message) => ({
  variant: TOAST_VARIANT.ERROR,
  message,
});
