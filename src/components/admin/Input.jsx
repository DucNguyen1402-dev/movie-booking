import { LockKeyhole } from "lucide-react";

export default function Input({
  label,
  register,
  name,
  rules,
  disabled = false,
  type = "text",
  error,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-medium tracking-wider text-slate-200">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          disabled={disabled}
          {...register(name, rules)}
          className={`w-full rounded-md border border-slate-700 px-3 py-2 text-sm text-slate-100 transition-colors duration-200 outline-none ${disabled ? "bg-slate-900/60" : "bg-slate-900/40 hover:border-indigo-500 hover:ring-2 hover:ring-indigo-500/20 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/2"}`}
        />
        {disabled && (
          <div className="absolute top-1/2 right-2 -translate-y-1/2">
            <LockKeyhole className="size-4.5" />
          </div>
        )}
      </div>
      {error && (
        <p className="rounded-sm border-l-5 border-red-600 bg-red-950/40 px-2 py-2 text-xs text-red-300">
          {error.message}
        </p>
      )}
    </div>
  );
}
