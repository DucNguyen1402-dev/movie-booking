import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { CircleChevronLeft, CircleChevronRight, Calendar } from "lucide-react";
import { format } from "date-fns";

export default function ShowDate({ control, getValues, watch }) {
  const CustomComponents = {
    Chevron: ({ orientation }) => {
      const Icon =
        orientation === "left" ? CircleChevronLeft : CircleChevronRight;
      return (
        <Icon className="flex size-6 cursor-pointer items-center justify-center rounded transition-colors duration-200 hover:text-blue-400" />
      );
    },
  };

  const [dayPickerVisible, setDayPickerVisible] = useState(null);

  const datePickerClasses = {
    root: "rounded-md border border-slate-300 bg-slate-800 text-white p-4 w-fit",
    month: "space-y-4",
    month_caption: "flex items-center",
    caption_label: "text-sm font-semibold",
    button_previous: "mr-2",
    weekdays: "flex",
    weekday: "flex-1 text-center text-xs font-medium uppercase text-slate-200",
    week: "flex",
    day: "h-9 w-9 p-0 ",
    day_button:
      "size-9 rounded-full text-sm transition-colors duration-200 hover:bg-blue-400 cursor-pointer hover:text-slate-300",
    today: "font-semibold text-rose-400",
    selected: "bg-blue-600 rounded-full transition-colors duration-300",
    disabled: "text-slate-400 opacity-50",
    outside: "text-slate-300",
  };

  const showDateLabel = watch("ngayChieu") || "Chọn lịch chiếu";
  const dateLabel = dayPickerVisible ? "Đang chọn..." : showDateLabel;

  return (
    <div className="flex flex-col gap-1.5 text-slate-700">
      <label
        className="mb-2 cursor-pointer text-sm font-medium"
        htmlFor="show-date"
      >
        Ngày chiếu
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={() => setDayPickerVisible((prev) => !prev)}
          className="flex w-full cursor-pointer items-center gap-2 rounded-sm border border-gray-300 p-2 transition-colors hover:border-gray-400 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          aria-expanded={dayPickerVisible}
          aria-haspopup="dialog"
        >
          <Calendar className="size-4.5" />
          <span>{dateLabel}</span>
        </button>
        <div
          className={`absolute top-[105%] left-0 transition-opacity duration-300 ${dayPickerVisible ? "" : "pointer-events-none opacity-0"}`}
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
                  classNames={datePickerClasses}
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
      </div>
    </div>
  );
}
