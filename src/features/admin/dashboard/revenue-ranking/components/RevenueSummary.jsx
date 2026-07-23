import { DollarSign, Film } from "lucide-react";

import { useDashboardContext } from "@features/admin/dashboard/contexts";
import {
  formatCompactCurrency,
  formatCurrency,
} from "@features/admin/dashboard/utils";

export default function RevenueSummary() {
  const {
    dashboardDerived: { revenue, derivedMovies },
  } = useDashboardContext();

  const buckets = {
    over100B: revenue.buckets.over100B.length,
    over50B: revenue.buckets.over50B.length,
  };
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="group flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800 px-6 py-5 transition-colors duration-300 hover:border-rose-500/40 hover:ring-2 hover:ring-rose-500/10">
        <div>
          <p className="text-sm text-slate-400">
            Tổng số lượng phim đang chiếu
          </p>
          <div className="mt-4 flex items-center gap-6">
            <p className="text-6xl font-bold text-slate-100">
              {derivedMovies.nowShowing.length}
            </p>
            <div className="space-y-2 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-yellow-500/30 bg-yellow-950/40 text-sm text-yellow-400 transition-colors duration-200 group-hover:border-yellow-500/60">
                  <span>{buckets.over100B}</span>
                </div>
                <span>phim đạt doanh thu trên 100 tỷ</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-500/30 bg-zinc-950/40 text-sm text-zinc-400 transition-colors duration-200 group-hover:border-zinc-500/60">
                  <span>{buckets.over50B}</span>
                </div>
                <span>phim đạt doanh thu trên 100 tỷ</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex size-10 items-center justify-center self-start rounded-lg border border-red-500/20 bg-red-950/30 transition-colors duration-200 group-hover:border-red-500/50">
          <Film className="size-6 text-red-400" />
        </div>
      </div>

      <div className="group flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800 p-5 px-6 py-5 hover:border-yellow-500/40 hover:ring-2 hover:ring-yellow-500/10">
        <div>
          <p className="text-sm text-slate-400">Tổng doanh thu</p>
          <div className="relative mt-4">
            <p className="text-3xl font-bold text-emerald-400 opacity-100 transition-opacity duration-100 group-hover:opacity-0">
              {formatCompactCurrency(revenue.total)}
            </p>
            <p className="absolute inset-0 text-3xl font-bold text-emerald-400 opacity-0 transition-opacity duration-100 group-hover:opacity-100">
              {formatCurrency(revenue.total)}
            </p>
          </div>
        </div>

        <div className="flex size-10 items-center justify-center self-start rounded-lg border border-yellow-500/20 bg-yellow-950/30 transition-colors duration-200 group-hover:border-yellow-500/50">
          <DollarSign className="size-6 text-slate-100" />
        </div>
      </div>
    </div>
  );
}
