import { useCallback, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ENTITIES } from "@config/admin";
import { createDeleteModalContent } from "@helpers/admin/modal";
import { toast, toastContent } from "@shared/toast";

import { useModalContext } from "@contexts/admin";
import { useScrollIntoView } from "@hooks/admin";
import { MODAL_TYPES, ROW_ACTION_ANIMATIONS } from "@constants/admin";

import { useDeleteMovie } from "./useDeleteMovie";

export function useMovieItem({ movie, movieId, highlight }) {
  const [onDeleting, setOnDeleting] = useState(false);
  const rowRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const modal = useModalContext();
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
      modal.close();
      toaster.show(toastContent.success.forDelete(ENTITIES.movie));
    } catch (error) {
      modal.close();
      const message =
        error?.response?.data.content ?? "Đã xảy ra lỗi, vui lòng thử lại sau.";
      toaster.show(toastContent.error.forDelete(message));
    } finally {
      setOnDeleting(false);
    }
  }, [modal, movie.maPhim, mutateAsync, toaster]);

  const onDeleteClick = useCallback(() => {
    setOnDeleting(true);
    modal.open({
      type: MODAL_TYPES.DELETE,
      content: createDeleteModalContent(ENTITIES.movie, movie.tenPhim),
      onConfirm: handleDeleteMovie,
      onCancel: () => {
        setOnDeleting(false);
        modal.close();
      },
    });
  }, [handleDeleteMovie, modal, movie.tenPhim]);

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
