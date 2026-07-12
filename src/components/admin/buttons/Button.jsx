import clsx from "clsx";

const sizes = {
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

export default function Button({
  children,
  Icon,
  size = "md",
  loading = false,
  fullWidth = false,
  className = "",
  ...props
}) {
  const currentSize = sizes[size];

  return (
    <button
      disabled={loading || props.disabled}
      className={clsx(
        "inline-flex items-center justify-center gap-2",
        "rounded-md font-medium",
        "transition-colors duration-300",
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
}
