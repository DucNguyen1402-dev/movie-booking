import Button from "./Button";
import {Trash} from "lucide-react"
import clsx from "clsx"

const surfaceStyles = {
  light: "bg-orange-500 hover:bg-orange-600",
  dark: "bg-orange-600 hover:bg-orange-500",
};

export default function EmptyStateButton({
  children,
  Icon = Trash,
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
