import { useMemo } from "react";

import { Button } from "@shared/ui";
import { format } from "date-fns";
import {
  CalendarPlus2,
  Flame,
  SquarePen,
  Star,
  Trash2,
  TvMinimalPlay,
} from "lucide-react";

import { useMovieListContext } from "@features/admin/movies/list/contexts";
import { useMovieItem } from "@features/admin/movies/list/hooks";

const MovieItem = ({ movie, movieId, highlight }) => {
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
  const { trailer } = useMovieListContext();

  const onOpenTrailerClick = useMemo(
    () => () => trailer.open({ url: movie.trailer, movieName: movie.tenPhim }),
    [movie.trailer, movie.tenPhim, trailer],
  );

  const actionButtonsConfig = useMemo(
    () => [
      {
        title: "Xem Trailer",
        className: "hover:bg-pink-500/10 hover:text-pink-400",
        onClick: onOpenTrailerClick,
        Icon: TvMinimalPlay,
      },
      {
        title: "Sửa thông tin",
        className: "hover:bg-indigo-500/10 hover:text-indigo-400",
        onClick: onEditClick,
        Icon: SquarePen,
      },
      {
        title: "Tạo lịch chiếu",
        className: "hover:bg-indigo-500/10 hover:text-indigo-400",
        onClick: onCreateShowTimeClick,
        Icon: CalendarPlus2,
      },
      {
        title: "Xóa phim",
        className: "hover:bg-red-500/10 hover:text-red-400",
        onClick: onDeleteClick,
        Icon: Trash2,
      },
    ],
    [onCreateShowTimeClick, onDeleteClick, onEditClick, onOpenTrailerClick],
  );

  return (
    <tr
      ref={isTargetMovie ? rowRef : null}
      className={`group border-t border-slate-700/80 transition-colors hover:bg-slate-700/20 ${isTargetMovie ? highlightAnimation : "duration-300"} ${onDeleting ? "bg-red-950/25 ring-1 ring-red-800/50 ring-inset" : ""}`}
    >
      <td className="py-4 pl-8 font-mono text-slate-400">#{movie.maPhim}</td>

      <td className="flex items-center gap-3 overflow-hidden px-6 py-4">
        <img
          src={movie.hinhAnh}
          alt={movie.tenPhim}
          className="h-18 w-14 rounded-sm border border-slate-700 bg-slate-800 object-cover shadow-sm"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/48x64";
          }}
        />
        <div className="flex flex-col gap-1">
          <span className="block text-sm font-semibold text-slate-200 transition-colors group-hover:text-yellow-400">
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
        {format(movie.ngayKhoiChieu, "dd/MM/yyyy")}
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

      <td className="px-4 py-4">
        <div className="flex items-center justify-end gap-1.5">
          {actionButtonsConfig.map((actionButton) => (
            <Button
              key={actionButton.title}
              onClick={actionButton.onClick}
              className={`text-slate-400 ${actionButton.className}`}
              title={actionButton.title}
              size="sm"
            >
              <actionButton.Icon className="h-4 w-4" />
            </Button>
          ))}
        </div>
      </td>
    </tr>
  );
};

export default MovieItem;
