export default function EditModal({ title, subtitle, onConfirm, onCancel }) {
  return (
    <div className="z-100 flex w-90 flex-col gap-3 rounded-xl border border-slate-700/60 bg-slate-800 p-6 text-slate-100 shadow-2xl shadow-black/90">
      <h2 className="text-lg font-semibold text-slate-50">{title}</h2>

      <p className="text-sm text-slate-400">{subtitle}</p>

      <div className="mt-3 flex justify-end gap-3">
        <button
          className="cursor-pointer rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-100 transition-colors duration-300 hover:bg-slate-700/50 hover:text-slate-200"
          onClick={onCancel}
        >
          Hủy
        </button>

        <button
          className="cursor-pointer rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-slate-100 transition-colors duration-300 hover:bg-sky-500 active:bg-sky-700"
          onClick={onConfirm}
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
}