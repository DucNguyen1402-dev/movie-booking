import { TOAST_VARIANT } from "@shared/toast";

const createErrorContent = (message) => ({
  variant: TOAST_VARIANT.ERROR,
  message,
});

export const errorToastContent = {
  forAdd: (message) => createErrorContent(message),
  forUpdate: (message) => createErrorContent(message),
  fortDelete: (message) => createErrorContent(message),
  forChangePassword: (message) => createErrorContent(message),
};
