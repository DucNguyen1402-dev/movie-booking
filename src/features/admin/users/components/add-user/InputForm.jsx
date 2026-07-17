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
      <label className="text-sm font-medium text-slate-200">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        name
        required
        className="rounded-sm border border-slate-600 cursor-pointer hover:ring-1 hover:ring-blue-500 text-slate-100 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        {...register(name, rules)}
      />
      {error && (
        <p className="z-20 mt-1 w-full rounded-sm border-l-5 border-red-600 bg-red-950/40 px-2 py-2 text-xs text-red-300">
          {error.message}{" "}
        </p>
      )}
    </div>
  );
}
