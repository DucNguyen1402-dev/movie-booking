import { usePagination } from "@hooks/admin";
import { useMovies } from "@features/admin/movies/hooks";

import { useMovieParams, useTrailer } from "./hooks";
import { MovieListContext } from "./MovieListContext";

export function MovieListProvider({ children }) {
  const { data: movies = [], isPending, isFetching } = useMovies();

  // Data có một số phim có state của dangChieu và sapChieu cùng là true
  // Phim không thể cùng lúc đang chiếu và sắp chiếu
  // không thể sửa backend nên fix tạm
  const normalizedMovies = movies.map((movie) =>
    movie.dangChieu && movie.sapChieu ? { ...movie, sapChieu: false } : movie,
  );

  const {
    states: { keyword, status, sortType },
    setSortType,
    setStatus,
    setKeyword,
    list,
    resetSearchKeyword,
  } = useMovieParams({ movies: normalizedMovies });

  const moviePagination = usePagination({
    items: list,
    resetDeps: [keyword, status, sortType],
  });
  const trailer = useTrailer();

  const value = {
    raw: {
      movies,
      isPending,
      isFetching,
    },

    processed: {
      list,
      state: {
        keyword,
        status,
        sortType,
      },
      actions: {
        resetSearchKeyword,
        setSortType,
        setStatus,
        setKeyword,
      },
    },

    trailer,
    pagination: moviePagination,
  };

  return (
    <MovieListContext.Provider value={value}>
      {children}
    </MovieListContext.Provider>
  );
}
