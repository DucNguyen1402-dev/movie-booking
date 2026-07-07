import { Link } from "react-router-dom";
import { Star, TvMinimalPlay, SquarePen, Trash2, Flame } from "lucide-react";
import { formatDate } from "../../utils/format/date";
import { useMovieItem } from "../../hooks/useMovieItem";
import { useTrailerContext } from "../../contexts/TrailerContext";

export default function MovieItem({ movie, movieId, highlight }) {
  const {
    onDeleteClick,
    setIsTrailerOpen,
    isTargetMovie,
    highlightAnimation,
    rowRef,
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

  const trailer = useTrailerContext();

  const onOpenTrailerClick = () =>
    trailer.open({ url: movie.trailer, movieName: movie.tenPhim });

  return (
    <tr
      ref={isTargetMovie ? rowRef : null}
      className={`group transition-colors hover:bg-slate-700/20 ${isTargetMovie ? highlightAnimation : "duration-300"}`}
    >
      <td className="px-6 py-4 font-mono text-slate-400">#{movie.maPhim}</td>

      <td className="flex items-center gap-3 px-6 py-4">
        <img
          src={movie.hinhAnh}
          alt={movie.tenPhim}
          className="h-18 w-14 rounded-sm border border-slate-700 bg-slate-800 object-cover shadow-sm"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/48x64";
          }}
        />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-slate-200 transition-colors group-hover:text-yellow-400">
              {movie.tenPhim}
            </span>
            {movie.hot && (
              <span className="inline-flex items-center gap-1 rounded-md border border-rose-500/20 bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-rose-400 uppercase">
                <span>Hot</span>
                <Flame className="h-4 w-4 fill-current text-rose-800" />
              </span>
            )}
          </div>
          <span className="font-mono text-xs text-slate-500">
            {movie.biDanh}
          </span>
        </div>
      </td>

      <td className="px-6 py-4 text-slate-300">
        {formatDate(movie.ngayKhoiChieu)}
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-1.5 text-amber-400">
          <Star className="h-4 w-4 fill-current" />

          <span className="font-semibold text-slate-200">{movie.danhGia}</span>
          <span className="text-xs text-slate-500">/10</span>
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex flex-col gap-1.5">
          {movie.dangChieu && (
            <span className="inline-flex items-center self-start rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 group-hover:border-emerald-500/50">
              <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              Đang chiếu
            </span>
          )}
          {movie.sapChieu && (
            <span className="inline-flex items-center self-start rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400 group-hover:border-amber-500/50">
              <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-amber-400"></span>
              Sắp chiếu
            </span>
          )}
          {!movie.dangChieu && !movie.sapChieu && (
            <span className="inline-flex items-center self-start rounded-full border border-slate-500/20 bg-slate-500/10 px-3 py-1 text-xs font-medium text-slate-400 group-hover:border-slate-500/50">
              <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-slate-400"></span>
              Ngừng chiếu
            </span>
          )}
        </div>
      </td>

      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={onOpenTrailerClick}
            className="cursor-pointer rounded-lg p-2 text-slate-400 transition-colors duration-300 hover:bg-red-500/10 hover:text-red-400"
            title="Xem Trailer"
          >
            <TvMinimalPlay className="h-4 w-4" />
          </button>
          <Link
            className="cursor-pointer rounded-lg p-2 text-slate-400 transition-colors duration-300 hover:bg-slate-700/50 hover:text-indigo-400"
            title="Sửa thông tin"
            to={`/admin/movies/edit/${movie.maPhim}`}
          >
            <SquarePen className="h-4 w-4" />
          </Link>
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
