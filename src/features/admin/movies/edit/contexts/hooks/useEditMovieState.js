import { useParams } from "react-router-dom";

import { useMovies } from "@features/admin/movies/hooks";


export function useEditMovieState() {
  const { id } = useParams();
  const { data: movies = [] } = useMovies();
  const movie  = movies.find(movie => movie.id === Number(id)) ?? {};
  return {
    id,
    movies,
    movie
  };
}
