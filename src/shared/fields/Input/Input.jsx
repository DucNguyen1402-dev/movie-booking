import { forwardRef } from "react";

import { ErrorMessage } from "@shared/fields";
import { cn } from "@shared/utils";
import { LockKeyhole } from "lucide-react";

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
      <div className={cn("flex flex-col gap-2", wrapperClassName)}>
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
          <ErrorMessage surface="dark" className={errorClassName}>
            {error}
          </ErrorMessage>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
