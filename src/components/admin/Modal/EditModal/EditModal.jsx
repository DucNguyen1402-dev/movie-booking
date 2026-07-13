export default function EditModal({ title, subtitle, onConfirm, onCancel }) {
  return (
    <div className="z-100 flex w-90 flex-col gap-3 rounded-xl border border-gray-300 bg-white p-6 text-slate-900">
      <h2 className="text-lg font-semibold">{title}</h2>

      <p className="text-sm text-slate-500">{subtitle}</p>

      <div className="mt-3 flex justify-end gap-3">
        <button
          className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors duration-300 hover:bg-gray-100 hover:text-slate-600"
          onClick={onCancel}
        >
          Hủy
        </button>

        <button
          className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-red-700"
          onClick={onConfirm}
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
}
