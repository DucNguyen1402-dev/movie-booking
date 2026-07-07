import MovieItem from "./MovieItem";
import { useProcessedMovies } from "../../hooks/useProcessedMovies";
import { useLocation } from "react-router-dom";

export default function MoviesTable() {
  const movies = useProcessedMovies();

   const location = useLocation();
   const updatedMovieId = location.state?.updatedMovieId;
   const addedMovieId = location.state?.addedMovieId;

   console.log(addedMovieId)

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
            {movies.map((movie) => (
              <MovieItem key={movie.maPhim} movie={movie}  updatedMovieId ={updatedMovieId} addedMovieId = {addedMovieId}/>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
