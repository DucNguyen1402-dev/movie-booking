import MovieItem from "./MovieItem";
import MovieTableSkeleton from "./MovieTableSkeleton";
import EmptyMoviesRow from "./EmptyMoviesRow";
import { useMovieContext } from "../../contexts/MovieContext";
import { useLocation } from "react-router-dom";
import { PaginationControls } from "../Pagination";

export default function MoviesTable() {
  const {
    moviePagination: { paginatedMovieList },
    isPending,
  } = useMovieContext();

  const location = useLocation();
  const { movieId = 0, highlight = "none" } = location.state || {};

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
        movieId={movieId}
        highlight={highlight}
      />
    ))
  );
  return (
    <div className = "space-y-12">
      <div className="min-h-screen overflow-hidden rounded-2xl border border-slate-800/80 bg-[#1e293b] px-5 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left table-fixed">
            <thead>
              <tr className="border-b border-slate-700/50 bg-[#1e293b]/80 text-sm font-medium tracking-wider text-slate-400 uppercase">
                <th className="px-4 py-8 2xl:w-30">Mã</th>
                <th className="px-4 2xl:w-100">Hình ảnh & Tên phim</th>
                <th className="px-4 2xl:w-45 ">Ngày khởi chiếu</th>
                <th className="px-4 2xl:w-35">Đánh giá</th>
                <th className="px-4 2xl:w-35">Trạng thái</th>
                <th className="text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/40 text-sm">
              {expression}
            </tbody>
          </table>
        </div>
      </div>

     {!isEmptyMovieList && <PaginationControls />}
    </div>
  );
}
