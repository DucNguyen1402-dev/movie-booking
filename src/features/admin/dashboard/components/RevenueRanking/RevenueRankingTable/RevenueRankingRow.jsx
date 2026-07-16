import {
  formatCompactCurrency,
  formatCurrency,
} from "../../../utils/format/currency";

export default function RevenueRankingRow({ movie, rank }) {
  return (
    <tr className="border-b border-slate-700 transition-colors duration-300 hover:bg-slate-700/20 group/outer">
      <td className="px-8 py-4 font-semibold text-amber-400">#{rank}</td>

      <td className="px-8 py-4">
        <img
          src={movie.hinhAnh}
          alt={movie.tenPhim}
          className="h-16 w-12 rounded object-cover"
        />
      </td>

      <td className="px-4">
       <div className ="space-y-2">
         <p className="font-medium text-slate-100 group-hover/outer:text-yellow-500">{movie.tenPhim}</p>
        <p className="text-xs text-slate-400">Rating {movie.danhGia}/10</p>
       </div>
      </td>

      <td >
       <div className="group/inner font-semibold flex items-center justify-center ">
         <div className="min-w-42 relative flex items-center justify-center border border-red-500/20 hover:border-red-500/50 bg-red-950/10 px-2 py-2 rounded-full text-red-400">
          <p className=" opacity-100 transition-opacity duration-300 group-hover/inner:opacity-0">
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

      {/* <td className="px-4">
        <div className="h-2 overflow-hidden rounded-full bg-slate-700">
          <div
            style={{ width: `${movie.percent}%` }}
            className="h-full rounded-full bg-emerald-500"
          />
        </div>
      </td> */}
    </tr>
  );
}
