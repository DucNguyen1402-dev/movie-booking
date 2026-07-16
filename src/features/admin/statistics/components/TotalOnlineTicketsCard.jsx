import { Ticket } from "lucide-react";
import {useStatistic} from "../hooks"

export default function TotalConlineTicketsCard({totalTickets = 12000, isLoading = false}) {

  const {accountInforList} =  useStatistic();

    console.log(accountInforList);

  return (

    <section className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-800">
      <div className="flex flex-col items-center justify-center px-8 py-16">
        <p className="text-sm font-medium tracking-[0.3em] text-slate-400 uppercase">
          Total Online Tickets
        </p>

        {isLoading ? (
          <div className="mt-8 h-16 w-56 animate-pulse rounded-lg bg-slate-700" />
        ) : (
          <h2 className="mt-6 text-6xl font-bold tracking-tight text-slate-100">
            {totalTickets.toLocaleString()}
          </h2>
        )}

        <p className="mt-6 max-w-lg text-center text-slate-400">
          Total seats booked through online reservations.
        </p>
      </div>

      <div className="flex items-center gap-3 border-t border-slate-700 bg-slate-900/40 px-6 py-4 text-sm text-slate-400">
        <Ticket size={18} className="text-sky-400" />

        <span>Data is calculated from users' booking history.</span>
      </div>
    </section>
  );
}
