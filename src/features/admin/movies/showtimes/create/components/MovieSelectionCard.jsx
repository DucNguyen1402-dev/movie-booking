import { CalendarCheck } from "lucide-react";

export default function MovieSelectionCard({ movie }) {
  return (
    <div className="group relative space-y-4 rounded-2xl bg-linear-to-br from-slate-800 to-slate-700 pt-6 pb-12 shadow-sm">
      <div className="flex justify-center">
        <img
          src={movie.hinhAnh}
          alt={movie.tenPhim}
          className="h-96 w-80 rounded-sm border-2 border-dashed border-slate-600 object-cover"
        />
      </div>

      <div className="space-y-4 rounded-xl p-8">
        <h1 className="mx-auto max-w-5xl text-center text-2xl font-black tracking-[0.12em] text-white uppercase">
          <span className="bg-linear-to-b from-white to-slate-300 bg-clip-text text-transparent">
            {movie.tenPhim}
          </span>
        </h1>

        <div className="absolute right-1 bottom-2 inline-flex w-full items-center justify-between px-8 py-1 text-sm font-medium">
          <div className="flex items-center gap-1 text-slate-300">
            <CalendarCheck className="size-5" />
            <span>Ngày khởi chiếu:</span>
          </div>
          <span className="inline-block rounded border border-slate-700 bg-indigo-500 px-2 py-0.5 text-sm font-bold tracking-wider text-slate-100 shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:border-indigo-500 group-hover:shadow-md group-hover:ring-2 group-hover:ring-indigo-500/20 group-hover:ring-offset-1">
            {movie.ngayKhoiChieu}
          </span>
        </div>
      </div>
    </div>
  );
}
