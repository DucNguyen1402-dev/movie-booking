import { useSelector } from "react-redux";
import { selectConfirmUpdate } from "@features/admin/movie-management/redux/selectors";
import { useMovies } from "@hooks/useMovies";
import { useParams } from "react-router-dom";
import { useState } from "react";
import {EMPTY_MOVIE} from "@constants/admin/movies"


export function useEditMovieState() {
  const [movie, setMovie] = useState(EMPTY_MOVIE);

  const [imgPreview, setImgPreview] = useState("");
  const isSaveConfirmed = useSelector(selectConfirmUpdate);
  const { id } = useParams();
  const { data: movies = [] } = useMovies();
  return {
    isSaveConfirmed,
    id,
    movies,
    movie,
    imgPreview,
    setImgPreview,
    setMovie,
  };
}
