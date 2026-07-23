import { Save } from "lucide-react";
import Button from "./Button";
import clsx from "clsx";


const surfaceStyles  = {
  light: "bg-blue-500 hover:bg-blue-600",
  dark: "bg-blue-600 hover:bg-blue-500",
  deepDark: "bg-blue-600 hover:bg-blue-600/80"
};

export default function SaveButton({
  children,
  Icon = Save,
  surface = "light",
  ...props
}) {
  return (
    <Button
      Icon={Icon}
      className={clsx("text-slate-50", surfaceStyles[surface] ?? colors.light)}
      {...props}
    >
      {children}
    </Button>
  );
}
