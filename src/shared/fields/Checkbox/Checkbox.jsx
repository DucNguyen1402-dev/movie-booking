import { forwardRef } from "react";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@utils/shared";

const Checkbox = forwardRef(
  (
    {
      checked,
      onCheckedChange,
      children,
      disabled,
      checboxClassName,
      labelClassName,
      id,
      ...props
    },
    ref,
  ) => {
    return (
      <label className="inline-flex cursor-pointer items-center select-none">
        <CheckboxPrimitive.Root
          ref={ref}
          checked={checked}
          id={id}
          disabled={disabled}
          onCheckedChange={onCheckedChange}
          className={cn(
            "flex h-5 w-5 items-center justify-center rounded-sm",
            "border border-slate-500 bg-slate-900/40",
            "cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
            "transition-colors duration-200",
            "hover:bg-indigo-500",
            "data-[state=checked]:border-indigo-600 data-[state=checked]:bg-indigo-600",
            "focus-visible:ring-2",
            "focus-visible:ring-indigo-500/20",
            "focus-visible:border-indigo-500",
            "focus-visible:outline-none",
            checboxClassName,
          )}
          {...props}
        >
          <CheckboxPrimitive.Indicator>
            <Check className="h-4 w-4 text-white" />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        {children && (
          <span
            className={cn(
              "ml-2 inline-flex items-center select-none",
              disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
              labelClassName,
            )}
          >
            {children}
          </span>
        )}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";
export default Checkbox;
