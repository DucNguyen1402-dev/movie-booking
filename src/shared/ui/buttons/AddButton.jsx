import clsx from "clsx";
import { Plus } from "lucide-react";

import Button from "./Button";

const surfaceStyles = {
  light: "bg-emerald-500 hover:bg-emerald-600",
  dark: "bg-emerald-600 hover:bg-emerald-500",
  deepDark: "bg-emerald-700 hover:bg-emerald-600",
};

const AddButton = ({ children, Icon = Plus, surface = "light", ...props }) => {
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

export default AddButton;
