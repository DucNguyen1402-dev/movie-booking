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
    <div className="flex flex-col gap-1.5 ">
      <label
        className="mb-2 cursor-pointer text-sm font-medium text-slate-200"
        htmlFor="show-time"
      >
        Giờ chiếu
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={() => setTimePickerVisible((prev) => !prev)}
          className={`flex w-full cursor-pointer items-center gap-2 rounded-sm border border-gray-600 p-1.5 transition-colors hover:ring-1 hover:ring-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none active:hover:border-gray-500 disabled:cursor-default ${isTimePickerDisabled ? "text-gray-500" : "text-gray-400"}`}
          aria-expanded={timePickerVisible}
          aria-haspopup="dialog"
          disabled={isTimePickerDisabled}
        >
          <Clock4 className="size-4.5" />
          <span

          >
            {isTimePickerDisabled ? "Vui lòng chọn rạp chiếu trước" : timeLabel}
          </span>
        </button>
        <>
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
                  timePickerRef={timePickerRef}
                />

                {fieldState.error && (
                   <p className="absolute top-[115%] left-0 w-full z-10 rounded-sm border-l-5 border-red-600 bg-red-950/40 px-2 py-2 text-xs text-red-300">
                {fieldState.error.message}
              </p>
                )}
              </>
            )}
          />
        </>
      </div>
    </div>
  );
}
