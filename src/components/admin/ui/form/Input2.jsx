import { forwardRef } from "react";

import { LockKeyhole } from "lucide-react";

import { cn } from "@utils/shared";

const Input = forwardRef(
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
      errorClassName,
      leftAddon: LeftAddon,
      rightIcon: RightIcon,
      leftIcon: LeftIcon,
      rightSlot,
      ...props
    },
    ref,
  ) => {
    const shouldShowDisabledIcon = disabled && showDisabledIcon;
    const Icon = shouldShowDisabledIcon ? LockKeyhole : RightIcon;
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
              LeftIcon && "pl-7",
            )}
            {...props}
          />
          {rightSlot && (
            <div className="absolute top-1/2 right-2 flex -translate-y-1/2 items-center justify-center">
              {rightSlot}
            </div>
          )}

          {Icon && (
            <div className="absolute top-1/2 right-2 -translate-y-1/2">
              <Icon className="size-4 text-slate-400" />
            </div>
          )}
        </div>
        {error && (
          <div
            className={cn(
              "rounded-sm border-l-5 border-red-600 bg-red-950/40 px-2 py-2 text-xs text-red-300",
              errorClassName,
            )}
          >
            {error}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
