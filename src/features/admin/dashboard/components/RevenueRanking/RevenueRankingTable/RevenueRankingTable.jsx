import RevenueRankingRow from "./RevenueRankingRow";
import { useDashboardContext } from "../../../contexts/DashboardContext";

export default function RevenueRankingTable() {
  const {
    dashboardDerived: { revenue,},
    revenueRankingFilter: {filteredMovies, filter}
  } = useDashboardContext();

  const isDescending = filter.sortDesc;

  return (
    <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800 min-h-screen">
      <table className="w-full table-fixed">
        <thead className="border-b border-slate-700 bg-slate-900">
          <tr className="text-left text-sm text-slate-300">
            <th className="w-20 3xl:w-25 px-8 py-8 text-center">RANKS</th>
            <th className="w-32 3xl:w-35 pl-8 ">HÌNH ẢNH</th>
            <th className="w-100 3xl:w-130 pl-4">TÊN PHIM</th>
            <th className="w-40 3xl:w-50 px-4">SỐ LƯỢNG VÉ BÁN</th>
            <th className="w-60 3xl:w-80 px-4 text-center">DOANH THU</th>
            <th className="px-4">% DOANH THU TƯƠNG ĐỐI</th>
          </tr>
        </thead>

        <tbody>
          {filteredMovies.map((movie, index) => {
            const relativeRevenueRate = (
              (movie.revenue / revenue.top) *
              100
            ).toFixed(0);
            return (
              <RevenueRankingRow
                key={movie.maPhim}
                movie={movie}
                rank={index + 1}
                relativeRevenueRate={relativeRevenueRate}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
