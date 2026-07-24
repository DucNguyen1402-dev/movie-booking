export default function SelectForm({
  label,
  options,
  name,
  register,
  error,
  rules,
  defaultOptionLabel,
}) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium text-slate-200">{label}</label>
      <select
        className="cursor-pointer rounded-sm border border-slate-600 bg-slate-900/40 px-3 py-2 text-sm text-slate-100 outline-none hover:ring-1 hover:ring-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        {...register(name, rules)}
      >
        <option
          value=""
          defaultValue
          className="bg-gray-800 text-white hover:bg-gray-800"
          disabled
        >
          {defaultOptionLabel}
        </option>

        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className="bg-gray-800 text-white"
          >
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="z-20 w-full rounded-sm border-l-5 border-red-600 bg-red-950/40 px-2 py-2 text-xs text-red-300">
          {error.message}
        </p>
      )}
    </div>
  );
}
