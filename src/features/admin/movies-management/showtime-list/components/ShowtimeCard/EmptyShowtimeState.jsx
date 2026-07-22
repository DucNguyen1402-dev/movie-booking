import { CalendarX, CalendarCog } from "lucide-react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

export default function EmptyShowtimeState() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const onShowtimeCreationClick = () =>
    navigate(`/admin/movies/showtimes/${id}/add`, {
      state: {
        history: [...(location.state?.history ?? []), location.pathname],
      },
    });

  return (
    <div className="flex min-h-105 flex-col items-center justify-center rounded-2xl  bg-slate-800 px-6 py-12 text-center">
      <div className="mb-6 rounded-full bg-slate-600 p-5">
        <CalendarX className="size-12 text-slate-100" />
      </div>

      <h2 className="text-2xl font-bold text-slate-100">
        Phim hiện tại không có lịch chiếu
      </h2>

      <p className="mt-3 max-w-md text-slate-200">
        Chưa có bất kỳ suất chiếu nào được tạo cho phim này. Hãy tạo lịch chiếu
        để khán giả có thể đặt vé.
      </p>

      <button
        onClick={onShowtimeCreationClick}
        className="mt-6 flex cursor-pointer items-center gap-1 rounded-md bg-green-600 px-3 py-2.5 text-sm font-medium text-slate-100 transition-colors duration-400 hover:bg-green-700"
      >
        <CalendarCog className="size-5 font-bold" />
        <span>Tạo lịch chiếu mới</span>
      </button>
    </div>
  );
}
