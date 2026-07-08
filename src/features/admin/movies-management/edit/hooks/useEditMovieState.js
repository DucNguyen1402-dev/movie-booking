import { useMovies } from "@hooks/admin/useMovies";
import { useParams } from "react-router-dom";
import { useState } from "react";



export function useEditMovieState() {
  const { id } = useParams();
  const { data: movies = [] } = useMovies();
  return {
    id,
    movies,
  };
}
