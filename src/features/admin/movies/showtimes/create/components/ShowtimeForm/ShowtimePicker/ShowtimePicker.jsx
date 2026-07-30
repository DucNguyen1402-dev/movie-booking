import { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";

import { FormLabel } from "@shared/fields";
import { Button } from "@shared/ui";
import { Clock4 } from "lucide-react";

import { cn } from "@utils/shared";

import TimePicker from "./TimePicker";

const Showtime = ({ isTimePickerDisabled, watch, control, rules }) => {
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
    <div className="flex flex-col gap-3">
      <FormLabel
        htmlFor="show-time"
        required={true}
        className={isTimePickerDisabled ? "text-slate-300" : ""}
      >
        Giờ chiếu
      </FormLabel>
      <div className="relative">
        <Button
          type="button"
          onClick={() => setTimePickerVisible((prev) => !prev)}
          className={cn(
            "py-1.5 pl-2 text-base disabled:cursor-default disabled:opacity-100",
            "justify-start",
            isTimePickerDisabled
              ? "border border-slate-600 bg-slate-900/80 text-gray-500"
              : "form-focus cursor-pointer bg-slate-900/40 text-gray-400",
            timePickerVisible && "border-indigo-500 ring-2 ring-indigo-500/20",
          )}

          icon={Clock4}
          fullWidth={true}
          aria-expanded={timePickerVisible}
          aria-haspopup="dialog"
          disabled={isTimePickerDisabled}
        >
          {isTimePickerDisabled ? "Vui lòng chọn rạp chiếu trước" : timeLabel}
        </Button>
        <>
          <Controller
            name="gioChieu"
            rules={rules}
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
                  <p className="absolute top-[115%] left-0 z-10 w-full rounded-sm border-l-5 border-red-600 bg-red-950/40 px-2 py-2 text-xs text-red-300">
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
};

export default Showtime;
