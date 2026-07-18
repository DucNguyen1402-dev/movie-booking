import MovieItem from "./MovieItem";
import MovieTableSkeleton from "./MovieTableSkeleton";
import { useProcessedMovies } from "../../hooks/useProcessedMovies";
import { useLocation } from "react-router-dom";

export default function MoviesTable() {
  const { isPending, movies } = useProcessedMovies();

  const location = useLocation();
  const { movieId = 0, highlight = "none" } = location.state || {};

  const expression = isPending ? (
    <MovieTableSkeleton />
  ) : (
    movies.map((movie) => (
      <MovieItem
        key={movie.maPhim}
        movie={movie}
        movieId={movieId}
        highlight={highlight}
      />
    ))
  );
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800/80 bg-[#1e293b] shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-700/50 bg-[#1e293b]/80 text-xs font-semibold tracking-wider text-slate-400 uppercase">
              <th className="px-6 py-4">Mã</th>
              <th className="px-6 py-4">Hình ảnh & Tên phim</th>
              <th className="px-6 py-4">Ngày khởi chiếu</th>
              <th className="px-6 py-4">Đánh giá</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/40 text-sm">
          {expression}
          </tbody>
        </table>
      </div>
    </div>
  );
}
