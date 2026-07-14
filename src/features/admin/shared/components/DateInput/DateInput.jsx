import { useState, useEffect, useRef } from "react";
import { Calendar } from "lucide-react";
import DatePicker from "./DatePicker";
import { format } from "date-fns";
import { useFormState } from "react-hook-form";


export default function DateInput({
  control,
  value,
  disabled = false,
  labels,
  name,
  rules,
}) {
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
    <div className="flex flex-col gap-1.5  ">
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
          className="flex w-full cursor-pointer items-center gap-2 rounded-sm border p-2 transition-colors focus:outline-none disabled:cursor-default text-slate-100 border-gray-600 focus:ring-2 focus:ring-blue-500 active:hover:border-blue-500/20"
          aria-expanded={isDatePickerOpen}
          aria-haspopup="dialog"
          disabled={disabled}
        >
          <Calendar className="size-4.5" />
          <span className={disabled ? "text-gray-200" : "text-gray-300"}>
            {disabled ? labels.disabled : dateLabel}
          </span>
        </button>
        <DatePicker
          datePickerRef={datePickerRef}
          isDatePickerOpen={isDatePickerOpen}
          control={control}
          requiredLabel={labels.required}
          name={name}
          rules={rules}
        />
        {errors.name && (
          <p className="z-20 mt-2 w-full rounded-sm border-l-5 px-2 py-2 text-xs border-red-600 bg-red-950/40 text-red-300">
            {errors.name.message}
          </p>
        )}
      </div>
    </div>
  );
}
