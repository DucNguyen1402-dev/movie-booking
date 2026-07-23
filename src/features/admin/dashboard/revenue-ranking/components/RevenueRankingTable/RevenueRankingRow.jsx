import {
  formatCompactCurrency,
  formatCurrency,
  formatRoundedNumber,
} from "@features/admin/dashboard/utils";
import { Medal } from "@components/admin";

export default function RevenueRankingRow({
  movie,
  rank,
  relativeRevenueRate,
}) {
  const medalAnimation =
    rank === 1 ? "origin-bottom group-hover/outer:animate-medal-shake" : "";

  return (
    <tr className="group/outer relative overflow-hidden border-b border-slate-700 transition-colors duration-300 hover:bg-slate-700/20">
      <td className="px-8 py-4">
        <Medal rank={rank} animate={medalAnimation} />
      </td>

      <td className="py-4 pl-8">
        <img
          src={movie.hinhAnh}
          alt={movie.tenPhim}
          className="h-20 w-15 rounded object-cover"
        />
      </td>

      <td className="pl-4">
        <div className="space-y-2">
          <p className="font-medium text-slate-100 group-hover/outer:text-yellow-500">
            {movie.tenPhim}
          </p>
          <p className="text-xs text-slate-400">Rating {movie.danhGia}/10</p>
        </div>
      </td>

      <td className="px-4 text-slate-200">
        {formatRoundedNumber(movie.ticketSold)}
      </td>

      <td>
        <div className="group/inner flex items-center justify-center font-semibold">
          <div className="relative flex min-w-42 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-950/30 py-1.5 text-emerald-300 group-hover/outer:border-emerald-500/50">
            <p className="opacity-100 transition-opacity duration-300 group-hover/inner:opacity-0">
              {formatCompactCurrency(movie.revenue)}
            </p>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="opacity-0 transition-opacity duration-300 group-hover/inner:opacity-100">
                {formatCurrency(movie.revenue)}
              </p>
            </div>
          </div>
        </div>
      </td>

      <td>
        <div className="flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800/60 ring-1 ring-white/5 backdrop-blur-sm">
            <div
              className="h-full rounded-full bg-linear-to-r from-yellow-500 to-yellow-400 shadow-[0_0_8px_rgba(16,185,129,0.3)] transition-all duration-500 ease-out"
              style={{ width: `${relativeRevenueRate}%` }}
            />
          </div>

          <span className="w-12 text-xs text-slate-300">
            {relativeRevenueRate}%
          </span>
        </div>
      </td>
    </tr>
  );
}
