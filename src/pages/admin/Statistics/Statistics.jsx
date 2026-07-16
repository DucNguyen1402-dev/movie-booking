import { TotalConlineTicketsCard } from "@features/admin/statistics/components";
export default function Statistic() {
  return (
    <section className="min-h-screen bg-linear-to-br from-slate-900 to-slate-800 p-6 pt-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <TotalConlineTicketsCard />
        <section className="grid gap-6 xl:grid-cols-3">
          <div className="flex h-96 items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-800 text-slate-500">
            Movie Status Chart
          </div>

          <div className="flex h-96 items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-800 text-slate-500 xl:col-span-2">
            Revenue Ranking Table
          </div>
        </section>
      </div>
    </section>
  );
}
