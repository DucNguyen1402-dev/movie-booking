import { useLayoutContext } from "@contexts/admin/layout";
import {
  RevenueHeader,
  RevenueRankingTable,
  RevenueSummary,
  RevenueToolbar,
} from "@features/admin/dashboard/revenue-ranking/components";

export default function RevenueRanking() {
  const { isSidebarOpen } = useLayoutContext();

  return (
    <section className="bg-linear-to-br from-slate-900 to-slate-800 px-8 py-10">
      <div
        className={`space-y-8 ${isSidebarOpen ? "mx-8 max-w-full" : "mx-auto lg:max-w-7xl "}`}
      >
        <RevenueHeader />

        <div className="mt-16">
          <RevenueSummary />
        </div>

        <RevenueToolbar />

        <RevenueRankingTable />
      </div>
    </section>
  );
}
