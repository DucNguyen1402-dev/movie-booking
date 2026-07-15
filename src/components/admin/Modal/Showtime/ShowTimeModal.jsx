export default function ShowtimeModal({
  onCancel,
  onConfirm,
  title,
  subtitle,
}) {
  return (
    <div className="z-100 flex w-full flex-col gap-3 rounded-xl border border-slate-700/60 bg-slate-800 p-6 text-slate-100 shadow-2xl shadow-black/90 lg:w-90">
      <h2 className="text-lg font-semibold text-slate-50">{title}</h2>

      <p className="text-sm text-slate-400">{subtitle}</p>

      <div className="mt-3 flex justify-end gap-3">
        <button
          className="cursor-pointer rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-400 transition-colors duration-300 hover:bg-slate-700/50 hover:text-slate-200"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button
          className="cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-indigo-500 active:bg-indigo-700"
          onClick={onConfirm}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}