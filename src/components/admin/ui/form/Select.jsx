import { cn } from "@utils/shared";

const Select = ({ value, options, onChange, className = "" }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={cn(
        "rounded-md border border-slate-700 bg-slate-950/40 px-4 text-slate-100 transition-colors duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20",
        className,
      )}
    >
      {options.map(({ value, label }) => (
        <option key={value} value={value} className="bg-slate-900 text-white">
          {label}
        </option>
      ))}
    </select>
  );
};

export default Select;
