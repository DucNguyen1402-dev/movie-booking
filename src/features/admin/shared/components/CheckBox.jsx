import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { Controller } from "react-hook-form";

export default function CheckBox({ control, name, label }) {
  return (
    <label className="inline-flex cursor-pointer items-center select-none">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Checkbox.Root
            checked={field.value}
            onCheckedChange={field.onChange}
            className="flex h-5 w-5 items-center justify-center rounded-sm border border-slate-500 data-[state=checked]:bg-blue-600"
          >
            <Checkbox.Indicator>
              <Check className="h-4 w-4 text-white" />
            </Checkbox.Indicator>
          </Checkbox.Root>
        )}
      />
      <span className="ml-2 text-sm text-slate-200">{label}</span>
    </label>
  );
}
