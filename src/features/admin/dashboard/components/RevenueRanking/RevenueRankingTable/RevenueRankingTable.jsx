import RevenueRankingRow from "./RevenueRankingRow";
import { useDashboardContext } from "../../../contexts/DashboardContext";

export default function RevenueRankingTable() {
  const {
    dashboardDerived: { dashboardRankings, topRevenue },
  } = useDashboardContext();


  return (
    <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800">
      <table className="w-full table-fixed">
        <thead className="border-b border-slate-700 bg-slate-900">
          <tr className="text-left text-sm text-slate-300">
            <th className="w-25 px-8 py-8 text-center">RANKS</th>
            <th className="w-35 px-8">HÌNH ẢNH</th>
            <th className="w-130 px-4">TÊN PHIM</th>
            <th className="w-50 px-4">SỐ LƯỢNG VÉ BÁN</th>
            <th className="w-80 px-4 text-center">DOANH THU</th>
            <th className="px-4">% DOANH THU TƯƠNG ĐỐI</th>
          </tr>
        </thead>

        <tbody>
          {dashboardRankings.map((movie, index) => {
            const relativeRevenueRate = (
              (movie.revenue / topRevenue) *
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
