import { useMovieListContext } from "@features/admin/movies/list/contexts";

export default function MovieStatusFilter() {
  const {
    processed: {
      state: { status },
      actions: { setStatus },
    },
  } = useMovieListContext();

  const onSelect = (e) => setStatus(e.target.value);

  return (
    <select
      value={status}
      onChange={onSelect}
      className="rounded-md border border-slate-700 bg-[#0f172a] px-4 py-2 text-sm text-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
    >
      <option value="">Tất cả trạng thái</option>
      <option value="dangChieu">Đang chiếu</option>
      <option value="sapChieu">Sắp chiếu</option>
    </select>
  );
}
