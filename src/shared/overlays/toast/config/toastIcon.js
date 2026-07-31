import { CheckCircle, Frown, Info, TriangleAlert, XCircle } from "lucide-react";

export const toastIconTypes = {
  success: CheckCircle,
  error: XCircle,
  warning: TriangleAlert,
  info: Info,
  system: Frown,
};

export const toastIconSizes = {
  sm: "size-5",
  md: "size-6",
  lg: "size-7",
};
