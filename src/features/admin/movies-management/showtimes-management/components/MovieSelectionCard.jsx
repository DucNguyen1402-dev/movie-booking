import { CalendarCog } from "lucide-react";
import MovieIcon from "@components/admin/MovieIcon";
import { useNavigate, useLocation } from "react-router-dom";

export default function MovieSelectionCard({ movie, hasNoData }) {

  const navigate = useNavigate();
  const location = useLocation();
  const onShowtimeCreationClick = () =>
    navigate(`/admin/movies/showtimes/${movie.maPhim}/add`, {
      state: {
        history: [...(location.state?.history ?? []), location.pathname],
      },
    });

  return (
    <section className="w-90 rounded-xl border bg-linear-to-b from-slate-400 via-slate-300 to-slate-200 px-3 pt-4 pb-3 shadow-sm">
      <div className="group/outer flex flex-col items-center justify-center gap-4">
        <div className="flex w-full flex-col items-center gap-2">
          <MovieIcon className="shrink-0 self-start" />
          <h1 className="text-center text-2xl font-bold tracking-wide text-slate-800">
            {movie.tenPhim}
          </h1>
        </div>

        <div className="flex items-center justify-center overflow-hidden rounded-md">
          <img src={movie.hinhAnh} alt={movie.tenPhim} className="w-80" />
        </div>
        {!hasNoData && (
          <button
            onClick={onShowtimeCreationClick}
            className="mt-6 flex cursor-pointer items-center gap-1 self-end rounded-md bg-green-600 px-3 py-2.5 text-sm font-medium text-white transition-colors duration-400 hover:bg-green-700"
          >
            <CalendarCog className="size-5 font-bold" />
            <span>Tạo lịch chiếu mới</span>
          </button>
        )}
      </div>
    </section>
  );
}
