import { usePagination } from "@hooks/admin";
import { useMovies } from "@features/admin/movies/hooks";

import { useMovieParams, useTrailer } from "./hooks";
import { MovieListContext } from "./MovieListContext";

export function MovieListProvider({ children }) {
  const { data: movies = [], isPending, isFetching } = useMovies();

  const {
    states: { keyword, status, sortType },
    setSortType,
    setStatus,
    setKeyword,
    list,
    resetSearchKeyword,
  } = useMovieParams({ movies });

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
