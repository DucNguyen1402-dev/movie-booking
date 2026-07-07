import { EMPTY_MOVIE } from "@constants/admin/movies";
export function useDerivedEditMovie({ id, movies }) {

  const editMovie = movies.find((movie) => movie.maPhim === Number(id)) ?? EMPTY_MOVIE;

  return {
    editMovie,
  };
}
