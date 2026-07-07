import { useMovies } from "@hooks/admin/useMovies";
import { useParams } from "react-router-dom";
import { useState } from "react";
import {EMPTY_MOVIE} from "@constants/admin/movies"


export function useEditMovieState() {
  const [movie, setMovie] = useState(EMPTY_MOVIE);

  const [imgPreview, setImgPreview] = useState("");
  const { id } = useParams();
  const { data: movies = [] } = useMovies();
  return {
    id,
    movies,
    movie,
    imgPreview,
    setImgPreview,
    setMovie,
  };
}
