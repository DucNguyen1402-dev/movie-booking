import { Search, ArrowUp, ArrowDown } from "lucide-react";
import { useDashboardContext } from "../../contexts/DashboardContext";

export default function RevenueToolbar() {
  const {
    revenueRankingFilter: { onSearchMovie, onSortClick, filter },
  } = useDashboardContext();

  const isDescending = filter.sortDesc;

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full max-w-sm">
        <Search
          size={18}
          className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500"
        />

        <input
          type="text"
          value={filter.keyword}
          onChange={(e) => onSearchMovie(e.target.value)}
          placeholder="Tìm tên phim..."
          className="w-full rounded-lg border border-slate-700 bg-slate-800 py-2.5 pr-4 pl-10 text-sm text-slate-100 transition-colors duration-300 outline-none hover:border-indigo-500 hover:ring-2 hover:ring-indigo-500/20 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      <button
        onClick={onSortClick}

        className="inline-flex w-40 cursor-pointer items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-slate-200 transition-colors duration-200 hover:bg-slate-700"
      >
        {isDescending ? <ArrowDown size={16} /> : <ArrowUp size={16} />}
        <span>{isDescending ? "Desc Revenue" : "Asc Revenue"}</span>
      </button>
    </div>
  );
}
