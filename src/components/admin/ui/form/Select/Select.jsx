import { ErrorMessage } from "@components/admin/ui/form";
import { cn } from "@utils/shared";

const Select = ({
  value,
  options,
  onChange,
  className,
  defaultOptionLabel,
  disabled,
  error,
  ...props
}) => (
  <div className="flex flex-col gap-2">
    <select
      value={value}
      disabled={disabled}
      onChange={onChange}
      className={cn(
        "form-focus rounded-sm bg-slate-900/40 px-4 py-1.5 text-slate-100 transition-colors duration-300",
        className,
      )}
      {...props}
    >
      {defaultOptionLabel && (
        <option value="" defaultValue className="bg-slate-900 text-white">
          {defaultOptionLabel}
        </option>
      )}

      {options.map((item) => {
        if ("options" in item) {
          return (
            <optgroup
              key={item.label}
              label={item.label}
              className="bg-slate-900 text-sm text-white"
            >
              {item.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </optgroup>
          );
        }

        return (
          <option
            key={item.value}
            value={item.value}
            className="bg-slate-900 text-white"
          >
            {item.label}
          </option>
        );
      })}
    </select>
    {error && <ErrorMessage surface="dark">{error}</ErrorMessage>}
  </div>
);

export default Select;
