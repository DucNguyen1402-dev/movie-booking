import { cn } from "@utils/shared";

const sizes = {
  none: {
    button: "",
    icon: "",
  },
  xs: {
    button: "px-1.5 py-0.75 text-xs",
    icon: "size-2",
  },
  sm: {
    button: "px-3 py-2 text-sm",
    icon: "size-4",
  },
  md: {
    button: "px-5 py-2.5 text-sm",
    icon: "size-5",
  },
  lg: {
    button: "px-6 py-3 text-base",
    icon: "size-6",
  },
};

const Button = ({
  children,
  icon: Icon,
  size = "md",
  loading = false,
  fullWidth = false,
  className = "",
  ...props
}) => {
  const currentSize = sizes[size];

  return (
    <button
      disabled={loading || props.disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2",
        "transition-colors duration-300",
        "rounded-md",
        "select-none",
        "cursor-pointer",
        "disabled:cursor-not-allowed disabled:opacity-50",
        currentSize.button,
        fullWidth ? "w-full" : "",
        className,
      )}
      {...props}
    >
      {Icon && !loading && <Icon className={currentSize.icon} />}

      {loading && (
        <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}

      <span>{children}</span>
    </button>
  );
};
export default Button;
