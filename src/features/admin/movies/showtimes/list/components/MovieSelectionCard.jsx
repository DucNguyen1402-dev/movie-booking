import { useLocation,useNavigate } from "react-router-dom";

import { CalendarCog } from "lucide-react";

import { AddButton } from "@components/admin";

export default function MovieSelectionCard({ movie, hasNoShowtime }) {
  const navigate = useNavigate();
  const location = useLocation();
  const onShowtimeCreationClick = () =>
    navigate(`/admin/movies/showtimes/${movie.maPhim}/add`, {
      state: {
        history: [...(location.state?.history ?? []), location.pathname],
      },
    });

  return (
    <section className="group/outer w-95 rounded-xl border border-slate-600 bg-linear-to-b from-slate-800 via-slate-700 to-slate-600 px-5 pt-4 pb-3 shadow-sm">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-center text-2xl font-bold tracking-wide text-slate-100">
          {movie.tenPhim}
        </h1>
        <div className="flex items-center justify-center overflow-hidden rounded-md">
          <img src={movie.hinhAnh} alt={movie.tenPhim} className="w-80" />
        </div>

        {!hasNoShowtime && (
          <div className="mt-8 self-end">
            <AddButton
              onClick={onShowtimeCreationClick}
              surface="deepDark"
              Icon={CalendarCog}
            >
              Tạo lịch chiếu mới
            </AddButton>
          </div>
        )}
      </div>
    </section>
  );
}
