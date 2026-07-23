import { useContext } from "react";

import { MovieListContext } from "./MovieListContext";

export function useMovieListContext() {
  const context = useContext(MovieListContext);

  if (!context) {
    throw error("useMovieListContext must be used within MovieListProvider");
  }

  return context;
}
