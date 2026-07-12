export default function Input({
  label,
  required,
  type = "text",
  name,
  register,
  rules,
  error,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-600">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name
        required
        className="rounded-sm border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500 text-slate-700"
        {...register(name, rules)}
      />
      {error && (
        <p className="rounded-sm border-l-5 border-red-500 bg-red-50 px-2 py-1.5 text-xs text-red-700">
          {error.message}
        </p>
      )}
    </div>
  );
}
