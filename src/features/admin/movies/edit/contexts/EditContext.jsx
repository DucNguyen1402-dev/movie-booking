import { useEditMovieState } from "../hooks/useEditMovieState";
import { useDerivedEditMovie } from "../hooks/useDerivedEditMovie";
import { useEditMovieEffects } from "../hooks/useEditMovieEffects";
import {useEditForm} from "../hooks/useEditForm"
import { useEditMovieActions } from "../hooks/useEditMovieActions";
import { createContext, useContext } from "react";

export const EditContext = createContext(null);

export function EditProvider({ children }) {
  const editStates = useEditMovieState();

  const derivedMovie = useDerivedEditMovie({
    id: editStates.id,
    movies: editStates.movies,
  });

  const editForm = useEditForm();
  const editActions = useEditMovieActions({
    editId: editStates.id,
    editMovie: derivedMovie.editMovie,
    trigger: editForm.trigger,
    getValues: editForm.getValues,
    setValue: editForm.setValue,
  });

  useEditMovieEffects({
    editMovie: derivedMovie.editMovie,
    formReset: editForm.reset
  });

  const value = {
    editStates,
    editActions,
    editForm
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
