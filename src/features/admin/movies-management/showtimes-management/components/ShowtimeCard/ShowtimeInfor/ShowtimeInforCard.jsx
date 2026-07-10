import {
  Clock3,
  Trash,
  Ticket,
  SquarePen,
} from "lucide-react";
import {formatShowtime} from "../../../utils/format"

export default function ShowtimeInforCard({ maRap, tenRap, ngayChieuGioChieu, thoiLuong, giaVe, index}) {
const {date, time} = formatShowtime(ngayChieuGioChieu);

  return (
    <article className="space-y-5 rounded-xl border border-gray-300 bg-linear-to-br from-slate-800 to-slate-700 p-5 pb-3 text-slate-100 transition-transform duration-300 hover:-translate-y-2 hover:shadow-md hover:ring-1">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-yellow-500">{tenRap}</h4>

        <span className="rounded bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
          #{maRap}
        </span>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2">
          <Clock3 className="size-4 text-slate-100" />

          <span>{date} - {time}</span>
        </div>

        <div className="flex items-center gap-2">
          <Ticket className="size-4 text-slate-100" />

          <span className="ml-1 text-red-400">{giaVe.toLocaleString("vi-VN", {style: "currency", currency: "VND"})}</span>
        </div>

        <div className="mt-5 space-x-2">
          <span>Thời lượng:</span>
          <span className="ml-1 font-medium text-slate-200">{thoiLuong} phút</span>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <button className="cursor-pointer rounded-lg border-none bg-indigo-600 px-2.5 py-2 transition-colors duration-200 hover:bg-indigo-500">
          <SquarePen className="size-4 text-indigo-100" />
        </button>

        <button className="cursor-pointer rounded-lg border-none bg-red-600 px-2.5 py-2 transition-colors duration-200 hover:bg-red-500">
          <Trash className="size-4 text-red-100" />
        </button>
      </div>
    </article>
  );
}
