import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-hook-form";

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
  const datePickerRef = useRef(null);
  const { errors } = useFormState({ control });

  const showDateLabel = value
    ? format(value, "dd/MM/yyyy")
    : labels.placeholder;
  const dateLabel = isDatePickerOpen ? "Đang chọn..." : showDateLabel;

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
    <div className="flex flex-col gap-1.5">
      <label
        className="mb-2 cursor-pointer text-sm font-medium text-slate-200"
        htmlFor="show-date"
      >
        {labels.form}
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={() => setDayPickerVisible((prev) => !prev)}
          className={`flex w-full items-center gap-2 rounded-sm border border-gray-600 bg-slate-900/40 p-1.5 transition-colors ${disabled ? "text-gray-500" : "c cursor-pointer text-gray-400 hover:ring-1 hover:ring-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none active:hover:border-blue-500/2"}`}
          aria-expanded={isDatePickerOpen}
          aria-haspopup="dialog"
          disabled={disabled}
        >
          <Calendar className="size-4.5" />
          <span>{disabled ? labels.disabled : dateLabel}</span>
        </button>
        <DatePicker
          datePickerRef={datePickerRef}
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
    </div>
  );
};

export default DateInput;
