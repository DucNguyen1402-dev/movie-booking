import clsx from "clsx";
import { Trash } from "lucide-react";

import Button from "./Button";

const surfaceStyles = {
  light: "bg-amber-500 hover:bg-amber-600",
  dark: "bg-amber-600 hover:bg-amber-500",
};

const EmptyStateButton = ({
  children,
  Icon = Trash,
  surface = "light",
  ...props
}) => {
  return (
    <Button
      icon={Icon}
      className={clsx(
        "text-white",
        surfaceStyles[surface] ?? surfaceStyles.light,
      )}
      {...props}
    >
      {children}
    </Button>
  );
};
export default EmptyStateButton;
