import { format } from "date-fns";
import { FileClock } from "lucide-react";

export default function RevenueHeader() {
  const time = format(new Date(), "dd/MM/yyyy HH:mm:ss");
  return (
    <header>
      <div className="flex items-center justify-center gap-2 text-slate-100">
        <FileClock className="text-slate-400" />
        <h2 className="flex flex-wrap items-center justify-center gap-2 text-center font-bold">
          <span> Bảng xếp hạng doanh thu tính đến</span>
          <span className="bg-slate-850 rounded-md border border-yellow-500/35 px-2.5 py-0.5 font-mono text-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.1)]">
            {time}
          </span>
        </h2>
      </div>
    </header>
  );
}
