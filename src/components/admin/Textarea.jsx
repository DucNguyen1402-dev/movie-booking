export default function Textarea({
  label,
  register,
  name,
  rules,
  error,
  id = null,
  rows = "1",
  textareaRef,
  onInput,
}) {
  const descriptionField = register("moTa", rules);

  return (
    <div className="flex flex-col gap-3">
      <label
        className="text-sm font-medium tracking-wider text-slate-200"
        htmlFor={id ?? name}
      >
        {label}
      </label>
      <div className="relative">
        <textarea
          onInput={onInput}
          id={id ?? name}
          rows={rows}
          {...descriptionField}
          ref={(e) => {
            descriptionField.ref(e);
            textareaRef.current = e;
          }}
          className="w-full overflow-hidden rounded-md border border-slate-700 bg-slate-900/40 px-3 py-2 text-[15px] text-slate-100 transition-colors duration-200 outline-none hover:border-indigo-500 hover:ring-2 hover:ring-indigo-500/20 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>
      {error && (
        <p className="rounded-sm border-l-5 border-red-600 bg-red-950/40 px-2 py-2 text-xs text-red-300">
          {error.message}
        </p>
      )}
    </div>
  );
}
