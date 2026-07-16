
import { Search, ArrowUpDown } from "lucide-react";

export default function RevenueToolbar() {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full max-w-sm">
        <Search
          size={18}
          className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500"
        />

        <input
          type="text"
          placeholder="Search movie..."
          className="w-full rounded-lg border border-slate-700 bg-slate-800 py-2.5 pr-4 pl-10 text-sm text-slate-100 transition outline-none focus:border-blue-500"
        />
      </div>

      <button className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-slate-200 transition hover:bg-slate-700">
        <ArrowUpDown size={16} />
        Revenue Desc
      </button>
    </div>
  );
}
