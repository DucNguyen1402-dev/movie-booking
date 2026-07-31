import { cn } from "@shared/utils";

const SURFACE_CLASSES = {
  light: "backdrop-light",
  normal: "backdrop-normal",
  dark: "backdrop-dark",
};

const DEFAULT_SURFACE = "normal";

const Backdrop = ({
  surface = DEFAULT_SURFACE,
  className = "",
  children,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        "backdrop",
        SURFACE_CLASSES[surface] ?? SURFACE_CLASSES[DEFAULT_SURFACE],
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Backdrop;
