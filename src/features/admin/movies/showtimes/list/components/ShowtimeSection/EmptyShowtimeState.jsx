import { useLocation, useNavigate, useParams } from "react-router-dom";

import { CalendarX } from "lucide-react";

import { AddButton } from "@components/admin/ui/buttons";
const EmptyShowtimeState = () => {
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
    <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl bg-slate-800 px-6 py-12 text-center">
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

      <div className="mt-6">
        <AddButton onClick={onShowtimeCreationClick} surface="dark">
          Tạo lịch chiếu mới
        </AddButton>
      </div>
    </div>
  );
};

export default EmptyShowtimeState;
