import { useMutation } from "@tanstack/react-query";
import { deleteMovie } from "@services/admin/api";
import { useDispatch } from "react-redux";
import {
  setTrailerState,
  setTrailderId,
} from "../redux/slice";

import { MODAL_TYPES } from "@constants/admin/modalTypes";
import { useRef, useEffect } from "react";
import { MOVIE_HIGHLIGHTS } from "@config/admin/movieHighlight";
import {useModal} from "@contexts/admin/ModalContext";

export function useMovieItem({ movie, movieId, highlight }) {
  const { mutateAsync } = useMutation({ mutationFn: deleteMovie });
  const rowRef = useRef(null);
  const isTargetMovie = movie.maPhim === Number(movieId);
  const highlightAnimation = MOVIE_HIGHLIGHTS[highlight];

  const modal = useModal();

  useEffect(() => {
    if (!isTargetMovie) return;

    rowRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [isTargetMovie]);

  const dispatch = useDispatch();
  const onDeleteClick = () => modal.open();

  const onTrailerClick = () => {
    dispatch(setTrailderId(movie.maPhim));
    dispatch(setTrailerState(true));
  };

  return {
    onDeleteClick,
    onTrailerClick,
    isTargetMovie,
    highlightAnimation,
    rowRef
  };
}
