import { TOAST_VARIANT } from "@shared/toast";

const createWarningContent = (message) => ({
  variant: TOAST_VARIANT.WARNING,
  message,
});

export const warningToastContent = {
  forAdd: (message) => createWarningContent(message),
  forUpdate: (message) => createWarningContent(message),
  forDelete: (message) => createWarningContent(message),
};
