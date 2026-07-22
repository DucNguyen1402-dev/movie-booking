
import { createContext, useContext } from "react";
import { useFilteredMovies, useTrailer } from "../hooks";
import {usePagination} from "@hooks/admin"
import {useMovies} from "@features/admin/movies/hooks"

const movieContext = createContext(null);

export function MovieProvider({ children }) {
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
    <movieContext.Provider value={value}>{children}</movieContext.Provider>
  );
}

export function useMovieContext() {
  const context = useContext(movieContext);

  if (!context) {
    throw error("useMovieContext must be used within MovieProvider");
  }

  return context;
}
