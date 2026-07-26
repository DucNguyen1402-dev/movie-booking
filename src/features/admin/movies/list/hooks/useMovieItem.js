import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { MOVIE_HIGHLIGHTS } from "@config/admin";

import { useModalContext, useNotificationContext } from "@contexts/admin";
import { useScrollIntoView } from "@hooks/admin";
import { MODAL_TYPES } from "@constants/admin";

import { useDeleteMovie } from "./useDeleteMovie";

export function useMovieItem({ movie, movieId, highlight }) {
  const [onDeleting, setOnDeleting] = useState(false);
  const rowRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const modal = useModalContext();
  const { notificationActions } = useNotificationContext();

  const { mutateAsync } = useDeleteMovie();

  const isTargetMovie = movie.maPhim === Number(movieId);
  const highlightAnimation = MOVIE_HIGHLIGHTS[highlight];

  useScrollIntoView({ ref: rowRef, enabled: isTargetMovie });

  const onCreateShowTimeClick = () =>
    navigate(`/admin/movies/showtimes/${movie.maPhim}`, {
      state: {
        history: [...(location.state?.history ?? []), location.pathname],
      },
    });

  const onEditClick = () =>
    navigate(`/admin/movies/edit/${movie.maPhim}`, {
      state: {
        history: [...(location.state?.history ?? []), location.pathname],
        shouldConfirmLeave: true,
      },
    });

  const handleDeleteMovie = async () => {
    try {
      await mutateAsync(movie.maPhim);
      modal.close();
      notificationActions.show({
        variant: "success",
        message: "Xóa phim thành công",
      });
    } catch (error) {
      modal.close();
      notificationActions.show({
        variant: "error",
        message: error.response.data?.content,
      });
    } finally {
      setOnDeleting(false);
    }
  };

  const onDeleteClick = () => {
    setOnDeleting(true);
    modal.open({
      type: MODAL_TYPES.DELETE,
      title: `Bạn có chắc muốn xóa phim "${movie.tenPhim}"?`,
      subtitle: "Hành động này không thể hoàn lại.",
      onConfirm: handleDeleteMovie,
      onCancel: () => {
        setOnDeleting(false);
        modal.close();
      },
    });
  };

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
