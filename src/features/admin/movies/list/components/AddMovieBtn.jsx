import { Plus } from "lucide-react";

export default function AddMovieBtn({onAddMovieClick}) {
  return (
    <button
    onClick={onAddMovieClick}
     className="flex items-center justify-center gap-2 self-start rounded-xl bg-green-600 px-4 py-2.5 font-medium text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-green-500 active:scale-98 md:self-auto cursor-pointer duration-300">
      <Plus />
      Thêm phim mới
    </button>
  );
}
