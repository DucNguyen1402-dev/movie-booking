import {
  spinnerColorClasses,
  spinnerSizeClasses,
} from "@shared/overlays/loading/config";

import { cn } from "@utils/shared";

const Spinner = ({ size = "md", color = "primary" }) => {
  const colorClass = spinnerColorClasses[color];
  const sizeClass = spinnerSizeClasses[size] ?? spinnerSizeClasses.md;

  return (
    <div className="relative flex items-center justify-center">
      <div
        className={cn(
          "absolute rounded-full blur-sm",
          { ...colorClass },
          sizeClass.outer,
        )}
      />
      <div
        className={cn("animate-spin rounded-full", colorClass, sizeClass.inner)}
      />
    </div>
  );
};
export default Spinner;
