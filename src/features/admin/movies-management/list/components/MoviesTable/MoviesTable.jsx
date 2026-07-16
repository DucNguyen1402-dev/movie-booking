import MovieItem from "./MovieItem";
import MovieTableSkeleton from "./MovieTableSkeleton";
import EmptyMoviesRow from "./EmptyMoviesRow";
import { useMovieContext } from "../../contexts/MovieContext";
import { useLocation, useNavigate } from "react-router-dom";
import { PaginationControls } from "../Pagination";
import { useState, useEffect } from "react";

export default function MoviesTable() {
  const navigate = useNavigate();
  const location = useLocation();

  const [rowState, setRowState] = useState(() => ({
    movieId: location.state?.movieId ?? null,
    highlight: location.state?.highlight ?? "",
  }));

  const {
    moviePagination: { paginatedMovieList, skipNextPageReset, moveToMoviePage },
    isPending,
    isFetching,
  } = useMovieContext();

  if (rowState.movieId) {
    skipNextPageReset.current = true;
  }

  useEffect(() => {
    if (!rowState.movieId || isFetching) return;

    moveToMoviePage(rowState.movieId);

    navigate(location.pathname, {
      replace: true,
      state: {
        history: location.state?.history ?? [],
      },
    });
  }, [rowState.movieId, isFetching]);

  useEffect(() => {
    if (!rowState.highlight || !rowState.movieId) return;
    const keys = ["highlight", "movieId"];
    const timers = keys
      .filter((key) => rowState[key])
      .map((key) =>
        setTimeout(() => {
          setRowState((prev) => ({ ...prev, [key]: "" }));
        }, 3000),
      );

    return () => timers.forEach(clearTimeout);
  }, [rowState.highlight, rowState.movieId]);

  const isEmptyMovieList = paginatedMovieList.length === 0;

  const expression = isPending ? (
    <MovieTableSkeleton />
  ) : isEmptyMovieList ? (
    <EmptyMoviesRow />
  ) : (
    paginatedMovieList.map((movie) => (
      <MovieItem
        key={movie.maPhim}
        movie={movie}
        movieId={rowState.movieId}
        highlight={rowState.highlight}
      />
    ))
  );


  return (
    <div className="flex min-h-screen flex-col space-y-8">
      {!isEmptyMovieList && <PaginationControls />}
      <div className="flex-1 overflow-hidden rounded-2xl border border-slate-800/80 bg-[#1e293b] px-5 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-700/50 bg-[#1e293b]/80 text-sm font-medium tracking-wider text-slate-400 uppercase">
                <th className="px-4 py-8 2xl:w-30">Mã</th>
                <th className="3xl:w-120 px-4 2xl:w-100">
                  Hình ảnh & Tên phim
                </th>
                <th className="3xl:w-50 px-4 2xl:w-40">Ngày khởi chiếu</th>
                <th className="3xl:w-40 px-4 2xl:w-35">Đánh giá</th>
                <th className="3xl:w-40 px-4 2xl:w-35">Trạng thái</th>
                <th className="3xl:w-40 px-4 2xl:w-40">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/40 text-sm">
              {expression}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
