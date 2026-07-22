import RevenueRankingRow from "./RevenueRankingRow";
import RevenueRankingSkeleton from "./RevenueRankingSkeleton";
import { EmptyStateButton } from "@components/admin/buttons";
import { EmptyTable } from "@components/admin";
import { useDashboardContext } from "@features/admin/dashboard/contexts";
import { PaginationControls } from "@components/admin";

export default function RevenueRankingTable() {
  const {
    dashboardDerived: { ranking },
    revenueRankingFilter: { filter, resetSearchFilter },
    isPending,
    pagination,
  } = useDashboardContext();

  const highestRevenue = ranking.highestRevenueMovie?.revenue;
  const isFilterNotFound = pagination.list.length === 0;

  const renderTableContent = () => {
    if (isPending) {
      return <RevenueRankingSkeleton />;
    }

    if (isFilterNotFound) {
      return (
        <EmptyTable
          colSpan={6}
          title="Không tìm thấy phim"
          description={`Không có tên phim nào khớp với từ khóa "${filter.keyword}"`}
        >
          <EmptyStateButton surface="dark" onClick={resetSearchFilter}>
            Xóa bộ lọc
          </EmptyStateButton>
        </EmptyTable>
      );
    }

    return pagination.list.map((movie) => (
      <RevenueRankingRow
        key={movie.maPhim}
        movie={movie}
        rank={ranking.rankMap.get(movie.maPhim)}
        relativeRevenueRate={Math.round((movie.revenue / highestRevenue) * 100)}
      />
    ));
  };

  return (
    <div className ="mt-16 space-y-8">
      <PaginationControls label="phim" controls={pagination.controls} />
      <div className="min-h-screen overflow-hidden rounded-xl border border-slate-700 bg-slate-800">
        <main>
          <table className="w-full table-fixed">
            <thead className="border-b border-slate-700 bg-slate-900">
              <tr className="text-left text-sm text-slate-300">
                <th className="3xl:w-25 w-20 px-8 py-8 text-center">RANKS</th>
                <th className="3xl:w-35 w-32 pl-8">HÌNH ẢNH</th>
                <th className="3xl:w-130 w-100 pl-4">TÊN PHIM</th>
                <th className="3xl:w-50 w-40 px-4">SỐ LƯỢNG VÉ BÁN</th>
                <th className="3xl:w-80 w-60 px-4 text-center">DOANH THU</th>
                <th className="px-4">% DOANH THU TƯƠNG ĐỐI</th>
              </tr>
            </thead>

            <tbody>{renderTableContent()}</tbody>
          </table>
        </main>
      </div>
    </div>
  );
}
