import { forwardRef } from "react";

import { LockKeyhole } from "lucide-react";

import { cn } from "@utils/shared";

const Input2 = forwardRef(
  (
    {
      disabled = false,
      type = "text",
      error,
      id = null,
      inputClassName,
      disabledClassName,
      showDisabledIcon = true,
      wrapperClassName,
      errorClassname,
      LeftAddon,
      RightIcon,
      LeftIcon,
      ...props
    },
    ref,
  ) => {
    const shouldShowDisabledIcon = disabled && showDisabledIcon;

    return (
      <div className={cn("flex flex-col gap-3", wrapperClassName)}>
        <div className="relative">
          {LeftAddon && (
            <div className="absolute top-1/2 left-2 -translate-y-1/2">
              <LeftAddon className="size-4 text-slate-400" />
            </div>
          )}
          {LeftIcon && (
            <div className="absolute top-1/2 left-2 -translate-y-1/2">
              <LeftIcon className="size-4 text-slate-400" />
            </div>
          )}
          {RightIcon && (
            <div className="absolute top-1/2 right-2 -translate-y-1/2">
              <RightIcon className="size-4 text-slate-400" />
            </div>
          )}
          <input
            ref={ref}
            id={id ?? props.name}
            type={type}
            disabled={disabled}
            className={cn(
              "input",
              disabled ? "input-disabled" : "input-default",
              inputClassName,
              disabled && disabledClassName,
            )}
            {...props}
          />
          {shouldShowDisabledIcon && (
            <div className="absolute top-1/2 right-2 -translate-y-1/2">
              <LockKeyhole className="size-4.5 text-yellow-700" />
            </div>
          )}
        </div>
        {error && (
          <div
            className={cn(
              "rounded-sm border-l-5 border-red-600 bg-red-950/40 px-2 py-2 text-xs text-red-300",
              errorClassname,
            )}
          >
            {error}
          </div>
        )}
      </div>
    );
  },
);

Input2.displayName = "Input";
export default Input2;
