import clsx from "clsx";
import { Plus } from "lucide-react";

import Button from "./Button";

const surfaceStyles  = {
  light: "bg-green-500 hover:bg-green-600",
  dark: "bg-green-600 hover:bg-green-500",
  deepDark: "bg-green-700 hover:bg-green-600"
};

export default function AddButton({
  children,
  Icon = Plus,
  surface = "light",
  ...props
}) {
  return (
    <Button
      Icon={Icon}
      className={clsx("text-white", surfaceStyles[surface] ?? surfaceStyles.light)}
      {...props}
    >
      {children}
    </Button>
  );
}
