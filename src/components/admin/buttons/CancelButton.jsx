import clsx from "clsx";
import Button from "./Button";

const surfaceSlyles = {
  light:
    "bg-slate-50 text-slate-700 border border-slate-300 hover:bg-slate-100",
  dark: "bg-slate-700 text-slate-300 border border-slate-600 hover:bg-slate-600 active:bg-slate-600",
};

export default function CancelButton({ children, surface = "light", ...props }) {
  return (
    <Button className={clsx(surfaceSlyles[surface] ?? styles.light)} {...props}>
      {children}
    </Button>
  );
}
