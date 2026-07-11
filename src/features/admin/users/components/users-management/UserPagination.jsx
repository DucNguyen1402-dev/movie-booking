export default function UserPagination({}) {
  return (
    <div className="flex items-center justify-between text-sm text-slate-500">
      <span>Hiển thị 1-10 / 120 người dùng</span>

      <div className="flex gap-2">
        <button className="rounded border px-3 py-2">&lt;</button>
        <button className="rounded bg-orange-500 px-3 py-2 text-white">
          1
        </button>
        <button className="rounded border px-3 py-2">2</button>
        <button className="rounded border px-3 py-2">3</button>
        <button className="rounded border px-3 py-2">&gt;</button>
      </div>
    </div>
  );
}
