import {
  RevenueRankingTable,
  RevenueHeader,
  RevenueSummary,
  RevenueToolbar,
} from "@features/admin/dashboard/components/RevenueRanking";
import { useLayoutContext } from "@contexts/admin";

export default function RevenueRanking() {
  const { isSidebarOpen } = useLayoutContext();

  return (
    <section className="bg-linear-to-br from-slate-900 to-slate-800 px-8 py-10">
      <div
        className={`space-y-8 ${isSidebarOpen ? "max-w-full mx-8" : "mx-auto lg:max-w-7xl "}`}
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
