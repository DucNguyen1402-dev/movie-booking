import { Film, DollarSign } from "lucide-react";
import { useDashboardContext } from "../../contexts/DashboardContext";
import {
  formatCompactCurrency,
  formatCurrency,
} from "../../utils/format/currency";

export default function RevenueSummary() {
  const {
    dashboardDerived: { totalRevenue, nowShowingMovies },
  } = useDashboardContext();

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="group flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800 px-6 py-5 transition-colors duration-300 hover:border-rose-500/40 hover:ring-2 hover:ring-rose-500/10">
        <div>
          <p className="text-sm text-slate-400">
            Tổng số lượng phim đang chiếu
          </p>
          <div className="mt-4 flex gap-2">
            <p className="mt-2 text-4xl font-bold text-slate-100">
              {nowShowingMovies.length}
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <span>4 phim đạt doanh thu trên 90 tỷ</span>
              <span>10 phim đạt doanh thu trên 50 tỷ</span>
            </div>
          </div>
        </div>
        <div className="flex size-12 items-center justify-center self-start rounded-lg border border-red-500/20 bg-red-950/30 transition-colors duration-200 group-hover:border-red-500/50">
          <Film className="size-8 text-red-400" />
        </div>
      </div>

      <div className="group flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800 p-5 px-6 py-5 hover:border-yellow-500/40 hover:ring-2 hover:ring-yellow-500/10">
        <div>
          <p className="text-sm text-slate-400">Tổng doanh thu</p>
          <div className="relative mt-4">
            <p className="text-3xl font-bold text-emerald-400 opacity-100 transition-opacity duration-100 group-hover:opacity-0">
              {formatCompactCurrency(totalRevenue)}
            </p>
            <p className="absolute inset-0 text-3xl font-bold text-emerald-400 opacity-0 transition-opacity duration-100 group-hover:opacity-100">
              {formatCurrency(totalRevenue)}
            </p>
          </div>
        </div>

        <div className="flex size-12 items-center justify-center self-start rounded-lg border border-yellow-500/20 bg-yellow-950/30 transition-colors duration-200 group-hover:border-yellow-500/50">
          <DollarSign className="size-8 text-slate-100" />
        </div>
      </div>
    </div>
  );
}
