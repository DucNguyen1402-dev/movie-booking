import { cn } from "@utils/shared";

const surfaceClasses = {
  dark: "border-red-600 bg-red-950/40 text-red-300",
  light: "border-red-300 bg-red-50 text-red-700",
};

const ErrorMessage = ({ error, children, className, surface = "dark" }) => {
  const content = error ?? children;
  if (!content) return null;

  const surfaceClass = surfaceClasses[surface] ?? surfaceClasses.dark;
  return (
    <p
      className={cn(
        "z-20 w-full rounded-sm border-l-5 px-2 py-2 text-xs",
        surfaceClass,
        className,
      )}
    >
      {content}
    </p>
  );
};

export default ErrorMessage;
