import { useCallback, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { modal, toast } from "@shared/overlays";
import { ROW_ACTION_ANIMATIONS } from "@shared/table";

import { useScrollIntoView } from "@hooks/admin";
import { ENTITIES } from "@features/admin/shared/config";

import { useDeleteMovie } from "./useDeleteMovie";

export function useMovieItem({ movie, movieId, highlight }) {
  const [onDeleting, setOnDeleting] = useState(false);
  const rowRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const modalApi = modal.use();
  const toaster = toast.use();

  const { mutateAsync } = useDeleteMovie();

  const isTargetMovie = movie.maPhim === Number(movieId);
  const highlightAnimation = ROW_ACTION_ANIMATIONS[highlight];

  useScrollIntoView({ ref: rowRef, enabled: isTargetMovie });

  const onCreateShowTimeClick = useCallback(
    () =>
      navigate(`/admin/movies/showtimes/${movie.maPhim}`, {
        state: {
          history: [...(location.state?.history ?? []), location.pathname],
        },
      }),
    [location.pathname, location.state?.history, movie.maPhim, navigate],
  );

  const onEditClick = useCallback(
    () =>
      navigate(`/admin/movies/edit/${movie.maPhim}`, {
        state: {
          history: [...(location.state?.history ?? []), location.pathname],
          shouldConfirmLeave: true,
        },
      }),
    [location.pathname, location.state?.history, movie.maPhim, navigate],
  );

  const handleDeleteMovie = useCallback(async () => {
    try {
      await mutateAsync(movie.maPhim);
      modalApi.close();
      toaster.show(toast.config.success.delete(ENTITIES.movie));
    } catch (error) {
      const message =
        error?.response?.data.content ?? "Đã xảy ra lỗi, vui lòng thử lại sau.";
      toaster.show(toast.config.error(message));
    } finally {
      setOnDeleting(false);
    }
  }, [modalApi, movie.maPhim, mutateAsync, toaster]);

  const onDeleteClick = useCallback(() => {
    setOnDeleting(true);
    modalApi.open({
      ...modal.config.delete(ENTITIES.movie, movie.tenPhim),
      onConfirm: handleDeleteMovie,
      onCancel: () => setOnDeleting(false),
    });
  }, [handleDeleteMovie, modalApi, movie.tenPhim]);

  return {
    onDeleteClick,
    isTargetMovie,
    highlightAnimation,
    rowRef,
    onCreateShowTimeClick,
    onEditClick,
    onDeleting,
  };
}
