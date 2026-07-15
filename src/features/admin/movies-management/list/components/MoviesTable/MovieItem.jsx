import {
  Star,
  TvMinimalPlay,
  SquarePen,
  Trash2,
  Flame,
  CalendarPlus2,
} from "lucide-react";
import { formatDate } from "../../utils/format/date";
import { useMovieItem } from "../../hooks/useMovieItem";
import { useMovieContext } from "../../contexts/MovieContext";

export default function MovieItem({ movie, movieId, highlight }) {
  const {
    onDeleteClick,
    onCreateShowTimeClick,
    onEditClick,
    isTargetMovie,
    highlightAnimation,
    rowRef,
    onDeleting,
  } = useMovieItem({
    movie,
    movieId,
    highlight,
  });

  //Phim không thể cùng lúc đang chiếu và sắp chiếu
  // không thể sửa backend nên fix tạm
  if (movie.dangChieu && movie.sapChieu) {
    movie.sapChieu = false;
  }

  const { trailer } = useMovieContext();

  const onOpenTrailerClick = () =>
    trailer.open({ url: movie.trailer, movieName: movie.tenPhim });

  return (
    <tr
      ref={isTargetMovie ? rowRef : null}
      className={`group transition-colors hover:bg-slate-700/20 ${isTargetMovie ? highlightAnimation : "duration-300"} ${onDeleting ? "bg-red-950/25 ring-1 ring-red-800/50 ring-inset" : ""}`}
    >
      <td className="px-4 py-4 font-mono text-slate-400">#{movie.maPhim}</td>

      <td className="flex items-center gap-3 overflow-hidden px-6 py-4">
        <img
          src={movie.hinhAnh}
          alt={movie.tenPhim}
          className="h-18 w-14 rounded-sm border border-slate-700 bg-slate-800 object-cover shadow-sm"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/48x64";
          }}
        />
        <div className="flex flex-col gap-1 ">
          <span className="block text-sm font-semibold text-slate-200 transition-colors group-hover:text-yellow-400 ">
            {movie.tenPhim}
          </span>

          <span className="font-mono text-xs text-slate-500">
            {movie.biDanh}
          </span>
          {movie.hot && (
            <span className="inline-flex items-center gap-1 self-start rounded-md border border-rose-500/20 bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-rose-400 uppercase">
              <span className="text-[8px]">hot</span>
              <Flame className="h-3.5 w-3.5 text-rose-800" />
            </span>
          )}
        </div>
      </td>

      <td className="px-4 py-4 text-slate-300">
        {formatDate(movie.ngayKhoiChieu)}
      </td>

      <td className="px-4 py-4">
        <div className="flex items-center gap-1.5 text-amber-400">
          <Star className="h-4 w-4 fill-current" />

          <span className="font-semibold text-slate-200">{movie.danhGia}</span>
          <span className="text-xs text-slate-500">/10</span>
        </div>
      </td>

      <td className="px-4 py-4">
        <div className="flex flex-col gap-1.5">
          {movie.dangChieu && (
            <span className="inline-flex w-25 items-center justify-center self-start rounded-full border border-emerald-500/20 bg-emerald-500/10 py-2 text-xs font-medium text-emerald-400 group-hover:border-emerald-500/50">
              <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              <span>Đang chiếu</span>
            </span>
          )}
          {movie.sapChieu && (
            <span className="inline-flex w-25 items-center justify-center self-start rounded-full border border-amber-500/20 bg-amber-500/10 py-2 text-xs font-medium text-amber-400 group-hover:border-amber-500/50">
              <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-amber-400"></span>
              <span>Sắp chiếu</span>
            </span>
          )}
          {!movie.dangChieu && !movie.sapChieu && (
            <span className="inline-flex w-25 items-center justify-center self-start rounded-full border border-slate-500/20 bg-slate-500/10 py-2 text-xs font-medium text-slate-400 group-hover:border-slate-500/50">
              <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-slate-400"></span>
              <span>Ngừng chiếu</span>
            </span>
          )}
        </div>
      </td>

      <td className="px-4 py-4 text-right">
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={onOpenTrailerClick}
            className="cursor-pointer rounded-lg p-2 text-slate-400 transition-colors duration-300 hover:bg-pink-500/10 hover:text-pink-400"
            title="Xem Trailer"
          >
            <TvMinimalPlay className="h-4 w-4" />
          </button>
          <button
            className="cursor-pointer rounded-lg p-2 text-slate-400 transition-colors duration-300 hover:bg-indigo-500/10 hover:text-indigo-400"
            title="Sửa thông tin"
            onClick={onEditClick}
          >
            <SquarePen className="h-4 w-4" />
          </button>

          <button
            className="cursor-pointer rounded-lg p-2 text-slate-400 transition-colors duration-300 hover:bg-blue-500/10 hover:text-blue-400"
            title="Tạo lịch chiếu"
            onClick={onCreateShowTimeClick}
          >
            <CalendarPlus2 className="h-4 w-4" />
          </button>
          <button
            className="cursor-pointer rounded-lg p-2 text-slate-400 transition-colors duration-300 hover:bg-rose-500/10 hover:text-rose-400"
            title="Xóa phim"
            onClick={onDeleteClick}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
