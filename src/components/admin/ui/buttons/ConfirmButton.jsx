import clsx from "clsx";

import Button from "./Button";

const surfaceStyles = {
  light: "bg-rose-500 hover:bg-rose-600",
  dark: "bg-rose-600 hover:bg-rose-500",
  deepDark: "bg-rose-600 hover:bg-rose-600/80",
};

const ConfirmButton = ({ children, surface = "light", ...props }) => {
  return (
    <Button
      className={clsx(
        "text-slate-50",
        surfaceStyles[surface] ?? surfaceStyles.light,
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ConfirmButton;
