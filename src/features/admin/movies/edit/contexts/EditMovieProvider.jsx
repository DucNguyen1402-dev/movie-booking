import {EditMovieContext} from "./EditMovieContext.js"

import {
  useEditMovieState,
  useDerivedEditMovie,
  useEditMovieEffects,
  useEditForm,
  useEditMovieActions,
} from "./hooks";


export function EditMovieProvider({ children }) {
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
    formReset: editForm.reset,
  });

  const value = {
    editStates,
    editActions,
    editForm,
  };

  return <EditMovieContext.Provider value={value}>{children}</EditMovieContext.Provider>;
}