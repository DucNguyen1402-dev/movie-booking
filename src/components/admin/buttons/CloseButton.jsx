import clsx from "clsx";
import { CircleX } from "lucide-react";

import Button from "./Button";

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
