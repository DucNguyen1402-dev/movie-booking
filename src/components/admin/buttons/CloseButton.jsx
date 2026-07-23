import clsx from "clsx";
import Button from "./Button";
import { CircleX } from "lucide-react";

const surfaceSlyles = {
  light: "text-slate-900 hover:text-slate-800",
  dark: "text-slate-300 hover:text-slate-50",
};

export default function CloseButton({ surface = "light", ...props }) {
  return (
    <Button
      className={clsx(surfaceSlyles[surface] ?? surfaceSlyles.light)}
      {...props}
    >
      <CircleX />
    </Button>
  );
}
