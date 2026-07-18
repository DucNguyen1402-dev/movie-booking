import { useState, useEffect, useRef } from "react";
import { Calendar } from "lucide-react";
import DatePicker from "./DatePicker";
import { format } from "date-fns";
import { useFormState } from "react-hook-form";

export default function DateInput({ control, value, disabled = false, labels , name, rules}) {
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
    <div className="flex flex-col gap-1.5 text-slate-700">
      <label
        className="mb-2 cursor-pointer text-sm font-medium"
        htmlFor="show-date"
      >
        {labels.form}
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={() => setDayPickerVisible((prev) => !prev)}
          className="flex w-full cursor-pointer items-center gap-2 rounded-sm border border-gray-300 p-2 transition-colors focus:ring-1 focus:ring-blue-500 focus:outline-none active:hover:border-gray-400 disabled:cursor-default"
          aria-expanded={isDatePickerOpen}
          aria-haspopup="dialog"
          disabled={disabled}
        >
          <Calendar className="size-4.5" />
          <span className={disabled ? "text-gray-400" : "text-gray-500"}>
            {disabled ? labels.disabled : dateLabel}
          </span>
        </button>
        <DatePicker
          datePickerRef={datePickerRef}
          isDatePickerOpen={isDatePickerOpen}
          control={control}
          requiredLabel={labels.required}
          name = {name}
          rules = {rules}
        />
        {errors.ngayChieu && (
          <p className=" z-20 mt-1 w-full rounded-sm border-l-5 border-red-500 bg-red-50 px-2 py-1.5 text-xs text-red-700">
            {errors.ngayChieu.message}
          </p>
        )}
      </div>
    </div>
  );
}
