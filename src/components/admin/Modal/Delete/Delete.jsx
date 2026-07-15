export default function Delete({ onCancel, onConfirm, title, subtitle }) {
  return (
    <div className="z-100 flex w-90 flex-col gap-4 rounded-xl border border-slate-700/60 bg-slate-800 p-6 text-slate-100 shadow-2xl shadow-black/90">
  <h2 className="text-xl font-bold tracking-wider text-slate-50">Xác nhận xóa</h2>
  
  <div className="mt-2 sspace-y-2 text-sm text-slate-200">
    <p>{title}</p>
    <p>{subtitle}</p>
  </div>

  <div className="mt-3 flex w-full items-center justify-center gap-2">
    <button
      className="grow cursor-pointer rounded-md border border-slate-700 bg-slate-750 py-1.5 text-sm font-medium text-slate-300 transition-colors duration-300 hover:bg-slate-700 hover:text-slate-100"
      onClick={onCancel}
    >
      Hủy
    </button>
    <button
      className="grow cursor-pointer rounded-md border-none bg-rose-600 py-1.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-rose-700 active:bg-rose-800"
      onClick={onConfirm}
    >
      Xác nhận
    </button>
  </div>
</div>
  );
}
