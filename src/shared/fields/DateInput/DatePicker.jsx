import { useMemo } from "react";
import { DayPicker } from "react-day-picker";
import { Controller } from "react-hook-form";

import { CircleChevronLeft, CircleChevronRight } from "lucide-react";

import { datePickerStyles } from "./date-picker";

import "react-day-picker/style.css";

const CustomComponents = {
  Chevron: ({ orientation }) => {
    const Icon =
      orientation === "left" ? CircleChevronLeft : CircleChevronRight;
    return (
      <Icon className="flex size-6 cursor-pointer items-center justify-center rounded transition-colors duration-200 hover:text-blue-400" />
    );
  },
};

const DatePicker = ({
  calendarRef,
  isDatePickerOpen = false,
  control,
  name,
  rules,
}) => {
  const today = useMemo(() => new Date(), []);
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <>
          <div
            className={`absolute top-[105%] left-0 z-30 transition-opacity duration-200 ${isDatePickerOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
            ref={calendarRef}
          >
            <DayPicker
              mode="single"
              selected={field.value}
              onSelect={field.onChange}
              defaultMonth={today}
              disabled={{ before: new Date() }}
              components={CustomComponents}
              classNames={datePickerStyles}
            />
          </div>
        </>
      )}
    />
  );
};

export default DatePicker;
