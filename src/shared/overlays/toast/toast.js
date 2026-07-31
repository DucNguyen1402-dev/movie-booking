import { useToastContext } from "./contexts";
import { errorToast, successToast, warningToast } from "./helpers";

const toast = {
  use: useToastContext,
  config: {
    success: successToast,
    error: errorToast,
    warning: warningToast,
  },
};

export default toast;
