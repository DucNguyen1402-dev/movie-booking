import RevenueRankingRow from "./RevenueRankingRow";
import { useDashboardContext } from "../../../contexts/DashboardContext";

export default function RevenueRankingTable() {
  const {
    dashboardDerived: { dashboardRankings },
  } = useDashboardContext();

  return (
    <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800">
      <table className="w-full table-fixed">
        <thead className="border-b border-slate-700 bg-slate-900">
          <tr className="text-left text-sm text-slate-300">
            <th className="w-20 text-center py-8">RANKS</th>
            <th className="w-35 px-8">HÌNH ẢNH</th>
            <th className="w-150 px-4">TÊN PHIM</th>
            <th className="px-4 text-center">DOANH THU</th>
            {/* <th className="w-40 px-4 py-4">Progress</th> */}
          </tr>
        </thead>

        <tbody>
          {dashboardRankings.map((movie, index) => (
            <RevenueRankingRow
              key={movie.maPhim}
              movie={movie}
              rank={index + 1}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
