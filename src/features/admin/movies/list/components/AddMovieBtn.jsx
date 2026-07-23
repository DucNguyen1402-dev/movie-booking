import { useLocation, useNavigate } from "react-router-dom";

import { Plus } from "lucide-react";

export default function AddMovieBtn() {
  const location = useLocation();
  const navigate = useNavigate();

  const onAddMovieClick = () =>
    navigate("/admin/movies/add", {
      state: {
        history: [...(location.state?.history ?? []), location.pathname],
      },
    });

  return (
    <button
      onClick={onAddMovieClick}
      className="flex cursor-pointer items-center justify-center gap-2 self-start rounded-xl bg-green-600 px-4 py-2.5 font-medium text-white shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:bg-green-500 active:scale-98 md:self-auto"
    >
      <Plus />
      Thêm phim mới
    </button>
  );
}
