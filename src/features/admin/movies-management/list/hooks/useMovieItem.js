import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMovie } from "@features/admin/movies-management/list/services/api";
import { MODAL_TYPES } from "@constants/admin/modalTypes";
import { useRef, useEffect, useState } from "react";
import { MOVIE_HIGHLIGHTS } from "@config/admin/movieHighlight";
import { useModalContext } from "@contexts/admin/modal";
import { useLoadingContext } from "@contexts/admin/loading";
import { MIN_LOADING_TIME } from "@constants/admin/loadingSpinner";
import { ensureMinDuration } from "@utils/admin/ensureMinDuration";
import { useNotificationContext } from "@contexts/admin/notification";
import { useNavigate, useLocation } from "react-router-dom";

export function useMovieItem({ movie, movieId, highlight }) {
  const [onDeleting, setOnDeleting] = useState(false);
  const { mutateAsync } = useMutation({
    mutationFn: deleteMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["movies"],
      });
    },
  });

  const rowRef = useRef(null);
  const isTargetMovie = movie.maPhim === Number(movieId);
  const highlightAnimation = MOVIE_HIGHLIGHTS[highlight];
  const queryClient = useQueryClient();

  const modal = useModalContext();
  const { showLoading, hideLoading } = useLoadingContext();
  const {  notificationActions } = useNotificationContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isTargetMovie) return;

    rowRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [isTargetMovie]);

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
    const start = Date.now();
    try {
      modal.close();
      showLoading();
      await mutateAsync(movie.maPhim);

      await ensureMinDuration(start, MIN_LOADING_TIME);
      notificationActions.show({
        variant: "success",
        message: "Xóa phim thành công",
      });
    } catch (error) {
      notificationActions.show({
        variant: "error",
        message: error.response.data?.content,
      });
    } finally {
      hideLoading();
      setOnDeleting(false);
    }
  };
  const onDeleteClick = () => {
    setOnDeleting(true);
    modal.open({
      type: MODAL_TYPES.DELETE_MOVIE,
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
