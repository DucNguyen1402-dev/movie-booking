import { useEditMovieState } from "../hooks/useEditMovieState";
import { useDerivedEditMovie } from "../hooks/useDerivedEditMovie";
import { useEditMovieEffects } from "../hooks/useEditMovieEffects";
import { useEditMovieActions } from "../hooks/useEditMovieActions";
import { createContext, useContext } from "react";

export const EditContext = createContext(null);

export function EditProvider({ children }) {
  const editStates = useEditMovieState();

  const derivedMovie = useDerivedEditMovie({
    id: editStates.id,
    movies: editStates.movies,
  });

  const editActions = useEditMovieActions({
    editId: editStates.id,
    movie: editStates.movie,
    setMovie: editStates.setMovie,
    setImgPreview: editStates.setImgPreview,
    editMovie: derivedMovie.editMovie,
  });

  useEditMovieEffects({
    editMovie: derivedMovie.editMovie,
    setMovie: editStates.setMovie,
    setImgPreview: editStates.setImgPreview,
  });

  const value = {
    editStates,
    editActions,
  };

  return <EditContext.Provider value={value}>{children}</EditContext.Provider>;
}

export function useEditMovie() {
  const context = useContext(EditContext);

  if (!context) {
    throw new Error("useEditMovie must be used within EditProvider");
  }

  return context;
}
