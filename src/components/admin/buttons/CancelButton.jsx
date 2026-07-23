import clsx from "clsx";

import Button from "./Button";

const surfaceSlyles = {
  light:
    "bg-slate-50 text-slate-700 border border-slate-300 hover:bg-slate-100",
  dark: "bg-slate-950/20 text-slate-300  border border-slate-700 hover:bg-slate-950/40 ",
  deepDark:
    "bg-slate-800/80 text-slate-300 border border-slate-700 hover:bg-slate-800/40",
};

export default function CancelButton({
  children,
  surface = "light",
  ...props
}) {
  return (
    <Button
      className={clsx(surfaceSlyles[surface] ?? surfaceSlyles.light)}
      {...props}
    >
      {children}
    </Button>
  );
}
