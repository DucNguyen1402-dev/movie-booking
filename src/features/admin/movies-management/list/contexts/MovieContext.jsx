import { createContext, useContext } from "react";
import { useProcessedMovies, useMoviePagination, useTrailer } from "../hooks";

const movieContext = createContext(null);

export function MovieProvider({ children }) {
  const { isPending, processedMovies, movies, keyword, status, sortType, isFetching } =
    useProcessedMovies();
  const moviePagination = useMoviePagination({
    movies: processedMovies,
    keyword,
    status,
    sortType,
  });
  const trailer = useTrailer();

  const value = {
    isPending,
    isFetching,
    processedMovies,
    movies,
    trailer,
    moviePagination,
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
