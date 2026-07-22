import { useContext } from "react";

import { MovieListContext } from "./MovieListContext";

export function useMovieListContext() {
  const context = useContext(MovieListContext);

  if (!context) {
    throw error("useMovieContext must be used within MovieProvider");
  }

  return context;
}
