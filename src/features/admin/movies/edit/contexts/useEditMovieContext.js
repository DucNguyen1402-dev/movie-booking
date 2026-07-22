import { useContext } from "react";
import { EditMovieContext } from "./EditMovieContext";

export function useEditMovieContext() {
  const context = useContext(EditMovieContext);

  if (!context) {
    throw new Error(
      "useEditMovieContext must be used within EditMovieProvider",
    );
  }

  return context;
}
