import { Controller } from "react-hook-form";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

const Checkbox = ({ control, name, label }) => {
  return (
    <label className="inline-flex cursor-pointer items-center select-none">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <CheckboxPrimitive.Root
            checked={field.value}
            onCheckedChange={field.onChange}
            className="flex h-5 w-5 items-center justify-center rounded-sm border border-slate-500 bg-slate-900/40 data-[state=checked]:bg-blue-600"
          >
            <CheckboxPrimitive.Indicator>
              <Check className="h-4 w-4 text-white" />
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>
        )}
      />
      <span className="ml-2 text-sm text-slate-200">{label}</span>
    </label>
  );
};

export default Checkbox;
