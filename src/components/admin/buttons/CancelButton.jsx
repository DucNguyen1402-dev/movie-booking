import clsx from "clsx";
import Button from "./Button";

const surfaceSlyles = {
  light:
    "bg-slate-50 text-slate-700 border border-slate-300 hover:bg-slate-100",
  dark: "bg-slate-900/60 text-slate-300 border border-slate-800 hover:bg-slate-900/30 hover:border-slate-600 active:bg-slate-900/40",
  deepDark:
    "bg-slate-800/80 text-slate-300 border border-slate-700 hover:bg-slate-800/40",
};

export default function CancelButton({
  children,
  surface = "light",
  ...props
}) {
  return (
    <Button className={clsx(surfaceSlyles[surface] ?? surfaceSlyles.light)} {...props}>
      {children}
    </Button>
  );
}
