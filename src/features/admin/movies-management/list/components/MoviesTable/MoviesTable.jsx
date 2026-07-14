import MovieItem from "./MovieItem";
import MovieTableSkeleton from "./MovieTableSkeleton";
import { useMovieContext } from "../../contexts/MovieContext";
import { useLocation } from "react-router-dom";

export default function MoviesTable() {
  const { moviePagination: { paginatedMovieList} , isPending} = useMovieContext();

  const location = useLocation();
  const { movieId = 0, highlight = "none" } = location.state || {};

  const expression = isPending ? (
    <MovieTableSkeleton />
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
    <div className="overflow-hidden rounded-2xl border border-slate-800/80 bg-[#1e293b] shadow-xl px-5 min-h-screen" >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left ">
          <thead>
            <tr className="border-b border-slate-700/50 bg-[#1e293b]/80 text-sm font-medium tracking-wider text-slate-400 uppercase ">
              <th className="px-6 py-8 2xl:w-32">Mã</th>
              <th className="px-6 2xl:w-150 ">Hình ảnh & Tên phim</th>
              <th className="px-6   2xl:w-80">Ngày khởi chiếu</th>
              <th className="px-6  2xl:w-60">Đánh giá</th>
              <th className="px-6  2xl:w-60">Trạng thái</th>
              <th className="px-6  text-center">Hành động</th>
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
