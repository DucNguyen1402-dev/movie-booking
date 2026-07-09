import { Controller } from "react-hook-form";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import "react-day-picker/style.css";
import {datePickerStyles} from "../../../config/date-picker"


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
  dayPickerVisible,
  control,
  setDayPickerVisible,
}) {
  return (
    <div
      className={`absolute z-10 top-[105%] left-0 transition-opacity duration-300 ${dayPickerVisible ? "opacity-100" : "pointer-events-none opacity-0"}`}
      ref={datePickerRef}
    >
      <Controller
        name="ngayChieu"
        control={control}
        rules={{ required: "Vui lòng chọn ngày xem" }}
        render={({ field, fieldState }) => (
          <>
            <DayPicker
              mode="single"
              selected={field.value}
              onSelect={(date) => {
                if (!date) return;
                field.onChange(format(date, "yyyy-MM-dd"));
                setDayPickerVisible(false);
              }}
              defaultMonth={new Date()}
              disabled={{ before: new Date() }}
              components={CustomComponents}
              classNames={datePickerStyles}
            />
            {fieldState.error && (
              <p className="rounded-sm border-l-5 border-red-500 bg-red-50 px-2 py-1.5 text-xs text-red-700">
                {fieldState.error.message}s
              </p>
            )}
    
          </>
        )}
      />
    </div>
  );
}
