import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-hook-form";

import { cn } from "@shared/utils";
import { format } from "date-fns";
import { Calendar } from "lucide-react";

import DatePicker from "./DatePicker";

const DateInput = ({
  control,
  value,
  disabled = false,
  labels,
  name,
  rules,
}) => {
  const [isDatePickerOpen, setDayPickerVisible] = useState(null);
  const calendarRef = useRef(null);
  const { errors } = useFormState({ control });

  const showDateLabel = value
    ? format(value, "dd/MM/yyyy")
    : labels.placeholder;
  const dateLabel = isDatePickerOpen ? "Đang chọn..." : showDateLabel;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setDayPickerVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <button
        type="button"
        id={name}
        onClick={() => setDayPickerVisible((prev) => !prev)}
        className={cn(
          "flex w-full items-center gap-2 rounded-sm p-1.5 transition-colors",
          disabled
            ? "border border-slate-600 bg-slate-900/80 text-gray-500"
            : "form-focus cursor-pointer bg-slate-900/40 text-gray-400",
        )}
        aria-expanded={isDatePickerOpen}
        aria-haspopup="dialog"
        disabled={disabled}
      >
        <Calendar className="size-4.5" />
        <span>{disabled ? labels.disabled : dateLabel}</span>
      </button>
      <DatePicker
        calendarRef={calendarRef}
        isDatePickerOpen={isDatePickerOpen}
        control={control}
        requiredLabel={labels.required}
        name={name}
        rules={rules}
      />
      {errors[name] && (
        <p className="z-20 mt-1.5 w-full rounded-sm border-l-5 border-red-600 bg-red-950/40 px-2 py-2 text-xs text-red-300">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

export default DateInput;
