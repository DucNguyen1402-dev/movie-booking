import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { useMovies } from "@features/admin/movies/hooks";
import MovieSelectionCard from "@features/admin/movies/showtimes/create/components/MovieSelectionCard";
import ShowtimeForm from "@features/admin/movies/showtimes/create/components/ShowtimeForm/ShowtimeForm";


export default function ShowtimeCreation() {
const { id } = useParams();

const { data: movies = [] } = useMovies();

const movieToSchedule = useMemo(() => {
  const movie = movies.find(
    (movie) => movie.maPhim === Number(id)
  );

  if (!movie) return {};

  return {
    ...movie,
    ngayKhoiChieu: movie.ngayKhoiChieu.split("T")[0],
  };
}, [movies, id]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 p-4">
      <div className="mx-auto mt-5 max-w-6xl space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <MovieSelectionCard movie = {movieToSchedule}/>
          <ShowtimeForm movie = {movieToSchedule}/>
        </div>
      </div>
    </div>
  );
}
