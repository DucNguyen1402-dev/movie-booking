import {
  RevenueRankingTable,
  RevenueHeader,
  RevenueSummary,
  RevenueToolbar,
} from "@features/admin/dashboard/components/RevenueRanking";

export default function RevenueRanking() {
  const time = new Date();

  return (
    <section className="space-y-8 bg-linear-to-br from-slate-900 to-slate-800 px-8 py-10">
      <RevenueHeader />

      <div className="mt-16">
        <RevenueSummary />
      </div>

      <RevenueToolbar />

      <RevenueRankingTable />
    </section>
  );
}
