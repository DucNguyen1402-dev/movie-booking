import { CalendarCheck, Film } from "lucide-react";

export default function MovieSelectionCard({ movie }) {
  return (
    <div className="group relative space-y-4 rounded-2xl bg-linear-to-br from-slate-800 to-slate-700 pt-6 pb-12 shadow-sm">
      <div className="flex justify-center">
        <img
          src={movie.hinhAnh}
          alt={movie.tenPhim}
          className="w-80 h-60 rounded-sm object-cover"
        />
      </div>

      <div className="space-y-4 rounded-xl p-8">
        <div className="flex gap-4">
          <div className="shrink-0 grow-0 flex w-12 h-10 items-center justify-center rounded-md bg-red-500">
            <Film className="size-6 text-slate-100" />
          </div>
          <h1 className="text-[26px] font-bold tracking-wider text-slate-100">
            {movie.tenPhim}
          </h1>
        </div>

        <div className="absolute right-1 bottom-2 inline-flex w-full items-center justify-between px-8 py-1 text-sm font-medium">
          <div className="flex items-center gap-1 text-slate-300">
            <CalendarCheck className="size-5" />
            <span>Ngày khởi chiếu:</span>
          </div>
          <span className="inline-block rounded border border-slate-700 bg-indigo-500 px-2 py-0.5 text-sm font-bold tracking-wider text-slate-100 shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:shadow-md group-hover:ring-2 group-hover:ring-indigo-500/20 group-hover:border-indigo-500 group-hover:ring-offset-1">
            {movie.ngayKhoiChieu}
          </span>
        </div>
      </div>
    </div>
  );
}
