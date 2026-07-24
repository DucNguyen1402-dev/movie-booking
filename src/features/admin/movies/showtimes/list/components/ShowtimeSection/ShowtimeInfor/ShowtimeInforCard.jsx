import { Clock3, Ticket } from "lucide-react";

import { formatShowtime } from "@features/admin/movies/showtimes/list/utils";

export default function ShowtimeInforCard({
  maRap,
  tenRap,
  ngayChieuGioChieu,
  thoiLuong,
  giaVe,
}) {
  const { date, time } = formatShowtime(ngayChieuGioChieu);

  return (
    <article className="group space-y-5 rounded-xl border border-slate-600 bg-linear-to-br from-slate-700/60 to-slate-700 p-5 text-slate-100 transition-transform duration-300 hover:-translate-y-2 hover:border-indigo-500 hover:shadow-md hover:ring-2 hover:ring-indigo-500/20">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-yellow-300">{tenRap}</h4>

        <span className="rounded bg-yellow-200 px-2 py-1 text-xs font-medium text-yellow-800">
          #{maRap}
        </span>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2 text-slate-200 group-hover:text-slate-100">
          <Clock3 className="size-4" />

          <span className="group-hover:text-rose-400">
            {date} - {time}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Ticket className="size-4 text-slate-200 group-hover:text-slate-100" />

          <span className="ml-1 group-hover:text-rose-400">
            {giaVe.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>

        <div className="mt-5 space-x-2">
          <span>Thời lượng:</span>
          <span className="ml-1 font-medium text-slate-200">
            {thoiLuong} phút
          </span>
        </div>
      </div>
    </article>
  );
}
