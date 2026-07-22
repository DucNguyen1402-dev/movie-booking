import { EMPTY_MOVIE } from "@features/admin/movies/edit/constants";

export function useDerivedEditMovie({ id, movies }) {

  const editMovie = movies.find((movie) => movie.maPhim === Number(id)) ?? EMPTY_MOVIE;

  return {
    editMovie,
  };
}
