import { useState, useEffect, useRef } from "react";
import { Clock4 } from "lucide-react";
import TimePicker from "./TimePicker";
import { Controller } from "react-hook-form";

export default function Showtime({ isTimePickerDisabled, watch, control }) {
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const timePickerRef = useRef(null);

  const showTimeLabel = watch("gioChieu") || "Chọn giờ chiếu";
  const timeLabel = timePickerVisible ? "Đang chọn..." : showTimeLabel;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (timePickerRef.current && !timePickerRef.current.contains(e.target)) {
        setTimePickerVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  return (
    <div className="flex flex-col gap-1.5 text-slate-700">
      <label
        className="mb-2 cursor-pointer text-sm font-medium"
        htmlFor="show-time"
      >
        Giờ chiếu
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={() => setTimePickerVisible((prev) => !prev)}
          className="flex w-full cursor-pointer items-center gap-2 rounded-sm border border-gray-300 p-2 transition-colors focus:ring-1 focus:ring-blue-500 focus:outline-none active:hover:border-gray-400 disabled:cursor-default"
          aria-expanded={timePickerVisible}
          aria-haspopup="dialog"
          disabled={isTimePickerDisabled}
        >
          <Clock4 className="size-4.5" />
          <span
            className={isTimePickerDisabled ? "text-gray-400" : "text-gray-500"}
          >
            {isTimePickerDisabled ? "Vui lòng chọn rạp chiếu trước" : timeLabel}
          </span>
        </button>
        <Controller
          name="gioChieu"
          rules={{ required: "Vui lòng chọn giờ chiếu" }}
          control={control}
          render={({ field, fieldState }) => (
            <>
              <TimePicker
                value={field.value}
                onChange={field.onChange}
                timePickerVisible={timePickerVisible}
                timePickerRef = {timePickerRef}
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
  );
}
