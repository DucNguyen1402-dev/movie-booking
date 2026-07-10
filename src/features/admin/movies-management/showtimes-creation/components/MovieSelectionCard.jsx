import { CalendarCheck, Film } from "lucide-react";

export default function MovieSelectionCard({ movie }) {
  return (
    <div className="group relative space-y-4 rounded-2xl bg-gray-400 pt-3 pb-12 shadow-sm">
      <div className="flex justify-center">
        <img
          src={movie.hinhAnh}
          alt={movie.tenPhim}
          className="w-75 rounded-sm object-cover"
        />
      </div>

      <div className="space-y-4 rounded-xl p-8">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-md bg-red-500">
            <Film className="size-5 text-white" />
          </div>
          <h1 className="text-[26px] font-bold tracking-wider text-slate-800">
            {movie.tenPhim}
          </h1>
        </div>

        <div className="absolute right-1 bottom-2 inline-flex w-full items-center justify-between px-8 py-1 text-sm font-medium">
          <div className="flex items-center gap-1 text-slate-700">
            <CalendarCheck className="size-5" />
            <span>Ngày khởi chiếu:</span>
          </div>
          <span className="inline-block rounded bg-indigo-500 px-2 py-0.5 text-sm font-bold tracking-wider text-white shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:shadow-md group-hover:ring-1 group-hover:ring-indigo-500 group-hover:ring-offset-1">
            {movie.ngayKhoiChieu}
          </span>
        </div>
      </div>
    </div>
  );
}
