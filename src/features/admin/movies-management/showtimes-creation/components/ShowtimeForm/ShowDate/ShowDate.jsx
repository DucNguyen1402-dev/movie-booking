import { useState, useEffect, useRef } from "react";
import { Calendar } from "lucide-react";
import DatePicker from "./DatePicker";

export default function ShowDate({ control, watch, isDatePickerDisabled }) {
  const [dayPickerVisible, setDayPickerVisible] = useState(null);
  const datePickerRef = useRef(null);

  const showDateLabel = watch("ngayChieu") || "Chọn lịch chiếu";
  const dateLabel = dayPickerVisible ? "Đang chọn..." : showDateLabel;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (datePickerRef.current && !datePickerRef.current.contains(e.target)) {
        setDayPickerVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          className="flex w-full cursor-pointer items-center gap-2 rounded-sm border border-gray-300 p-2 transition-colors focus:ring-1 focus:ring-blue-500 focus:outline-none active:hover:border-gray-400 disabled:cursor-default"
          aria-expanded={dayPickerVisible}
          aria-haspopup="dialog"
          disabled={isDatePickerDisabled}
        >
          <Calendar className="size-4.5" />
          <span
            className={isDatePickerDisabled ? "text-gray-400" : "text-gray-500"}
          >
            {isDatePickerDisabled ? "Vui lòng chọn rạp chiếu trước" : dateLabel}
          </span>
        </button>
        <DatePicker
          datePickerRef={datePickerRef}
          dayPickerVisible={dayPickerVisible}
          control={control}
        />
      </div>
    </div>
  );
}
