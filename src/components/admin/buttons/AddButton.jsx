import { Plus } from "lucide-react";
import Button from "./Button";
import clsx from "clsx";

const surfaceStyles  = {
  light: "bg-green-500 hover:bg-green-600",
  dark: "bg-green-600 hover:bg-green-500",
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
      className={clsx("text-white", surfaceStyles[surface] ?? colors.light)}
      {...props}
    >
      {children}
    </Button>
  );
}
