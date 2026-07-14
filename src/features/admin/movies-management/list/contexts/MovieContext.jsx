import { createContext, useContext } from "react";
import { useProcessedMovies ,useMoviePagination, useTrailer } from "../hooks";


const movieContext = createContext(null);

export function MovieProvider({ children }) {
  const {isPending, processedMovies, movies } = useProcessedMovies();
  const moviePagination = useMoviePagination({movies:processedMovies });
  const trailer = useTrailer();

  const value = {
    isPending, processedMovies, movies,
    trailer,
    moviePagination
  };
  return (
    <movieContext.Provider value={value}>{children}</movieContext.Provider>
  );
}



export function useMovieContext(){

    const context = useContext(movieContext);

    if(!context){
        throw error("useMovieContext must be used within MovieProvider");
    };

    return context;
}