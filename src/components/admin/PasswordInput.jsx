import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({
  register,
  label,
  name,
  rules,
  id = null,
  error,
  required = false
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-3">
      <label
        htmlFor={id ?? name}
        className="block cursor-pointer text-sm text-slate-200"
      >
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <div className="relative">
        <input
          id={id ?? name}
          type={showPassword ? "text" : "password"}
          name={name}
          {...register(name, rules)}
          className="w-full rounded-md border border-slate-700 bg-slate-900/40 px-3 py-2 text-sm text-slate-100 transition-colors duration-200 outline-none hover:border-indigo-500 hover:ring-2 hover:ring-indigo-500/20 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/2"
        />
        <button
          onClick={() => setShowPassword((prev) => !prev)}
          type ="button"
          className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
        >
          {showPassword ? (
            <Eye className="size-4" />
          ) : (
            <EyeOff className="size-4" />
          )}
        </button>
      </div>
      {error && (
        <p className="rounded-sm border-l-5 border-red-600 bg-red-950/40 px-2 py-2 text-xs text-red-300">
          {error.message}
        </p>
      )}
    </div>
  );
}
