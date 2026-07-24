export default function Select({ value, options, onChange, className = "" }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`rounded-md border border-slate-700 bg-[#0f172a] px-4 text-slate-100 transition-colors duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 ${className}`}
    >
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
