import { useMovies } from "@hooks/admin/useMovies";
import { createContext, useContext } from "react";
import { useFilteredMovies, useMoviePagination, useTrailer } from "../hooks";

const movieContext = createContext(null);

export function MovieProvider({ children }) {
  const { data: movies = [], isPending, isFetching } = useMovies();

  const {
    states: { keyword, status, sortType },
    list,
    resetSearchKeyword,
  } = useFilteredMovies({ movies });

  const moviePagination = useMoviePagination({
    movies: list,
    keyword,
    status,
    sortType,
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
