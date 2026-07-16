import { Controller } from "react-hook-form";
import { DayPicker } from "react-day-picker";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import "react-day-picker/style.css";
import { datePickerStyles } from "@config/admin/date-picker";

export const CustomComponents = {
  Chevron: ({ orientation }) => {
    const Icon =
      orientation === "left" ? CircleChevronLeft : CircleChevronRight;
    return (
      <Icon className="flex size-6 cursor-pointer items-center justify-center rounded transition-colors duration-200 hover:text-blue-400" />
    );
  },
};

export default function DatePicker({
  datePickerRef,
  isDatePickerOpen,
  control,
  name,
  rules
}) {
  return (
    <>
      <Controller
        name= {name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <>
            <div
              className={`absolute top-[102%] left-0 z-30 transition-opacity duration-300 ${isDatePickerOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
              ref={datePickerRef}
            >
              <DayPicker
                mode="single"
                selected={field.value}
                onSelect={(date) => field.onChange(date)}
                defaultMonth={new Date()}
                disabled={{ before: new Date() }}
                components={CustomComponents}
                classNames={datePickerStyles}
              />
            </div>
  
          </>
        )}
      />
    </>
  );
}
