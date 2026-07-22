import { MovieListContext } from "./MovieListContext";
import { useFilteredMovies, useTrailer } from "./hooks";
import { usePagination } from "@hooks/admin";
import { useMovies } from "@features/admin/movies/hooks";

export function MovieListProvider({ children }) {
  const { data: movies = [], isPending, isFetching } = useMovies();

  const {
    states: { keyword, status, sortType },
    list,
    resetSearchKeyword,
  } = useFilteredMovies({ movies });

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
      },
      actions: {
        resetSearchKeyword,
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
