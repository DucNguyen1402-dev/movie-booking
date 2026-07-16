import {
  formatCompactCurrency,
  formatCurrency,
  formatRoundedNumber,
} from "../../../utils/format";
import Medal from "@components/admin/Medal";

const REVENUE_STYLES = [
  {
    min: 90,
    classes:
      "border-yellow-500/20 bg-yellow-950/20 text-yellow-400 group-hover/outer:border-yellow-500/50",
  },
  {
    min: 80,
    classes:
      "border-gray-500/20 bg-gray-950/20 text-gray-400 group-hover/outer:border-gray-500/50",
  },
  {
    min: 70,
    classes:
      "border-orange-500/20 bg-orange-950/20 text-orange-400 group-hover/outer:border-orange-500/50",
  },
];

const BASE_CLASSES = "border";

export const getRevenueClasses = (relativeRevenueRate) => {
  const style = REVENUE_STYLES.find(({ min }) => relativeRevenueRate >= min);

  return `${BASE_CLASSES} ${
    style?.classes ??
    "border-zinc-500/20 bg-zinc-950/30 text-zinc-300 group-hover/outer:border-zinc-500/50"
  }`;
};

const getRankIcon = (rank) => {
  switch (rank) {
    case 1:
      return <Medal className="h-5 w-5 fill-yellow-400 text-yellow-400" />;
    case 2:
      return <Medal className="h-5 w-5 fill-gray-300 text-gray-300" />;
    case 3:
      return <Medal className="h-5 w-5 fill-orange-400 text-orange-400" />;
    default:
      return <span className="font-semibold text-zinc-400">#{rank}</span>;
  }
};

export default function RevenueRankingRow({
  movie,
  rank,
  relativeRevenueRate,
}) {
  return (
    <tr className="group/outer border-b border-slate-700 transition-colors duration-300 hover:bg-slate-700/20">
      <td className="px-8 py-4">
        <Medal rank={rank} />
      </td>

      <td className="px-8 py-4">
        <img
          src={movie.hinhAnh}
          alt={movie.tenPhim}
          className="h-20 w-15 rounded object-cover"
        />
      </td>

      <td className="px-4">
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
          <div
            className={`relative flex min-w-42 items-center justify-center rounded-full border py-1.5 ${getRevenueClasses(relativeRevenueRate)}`}
          >
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
              className="h-full rounded-full bg-linear-to-r from-emerald-500 to-green-400 shadow-[0_0_8px_rgba(16,185,129,0.3)] transition-all duration-500 ease-out"
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
