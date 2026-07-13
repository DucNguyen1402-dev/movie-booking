import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMovie } from "@services/admin/api";
import { MODAL_TYPES } from "@constants/admin/modalTypes";
import { useRef, useEffect } from "react";
import { MOVIE_HIGHLIGHTS } from "@config/admin/movieHighlight";
import { useModalContext } from "@contexts/admin/ModalContext";
import { useLoading } from "@contexts/admin/LoadingSpinnerContext";
import { MIN_LOADING_TIME } from "@constants/admin/loadingSpinner";
import { ensureMinDuration } from "@utils/admin/ensureMinDuration";
import { useNotification } from "@contexts/admin/NotificationContext";
import { useNavigate, useLocation } from "react-router-dom";

export function useMovieItem({ movie, movieId, highlight }) {
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
  const { showLoading, hideLoading } = useLoading();
  const { notifActions } = useNotification();
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
      },
    });

  const onDeleteClick = () =>
    modal.open({
      type: MODAL_TYPES.DELETE_MOVIE,
      title: "Bạn có chắc muốn xóa phim này không?",
      subtitle: "Hành động này không thể hoàn lại.",
      onConfirm: handleDeleteMovie,
    });

  const handleDeleteMovie = async () => {
    const start = Date.now();
    try {
      modal.close();
      showLoading();
      await mutateAsync(movie.maPhim);

      await ensureMinDuration(start, MIN_LOADING_TIME);
      notifActions.showNotification({
        variant: "success",
        message: "Xóa phim thành công",
      });
    } catch (error) {
      notifActions.showNotification({
        variant: "error",
        message: error.response.data?.content,
      });
    } finally {
      hideLoading();
    }
  };

  return {
    onDeleteClick,
    isTargetMovie,
    highlightAnimation,
    rowRef,
    onCreateShowTimeClick,
    onEditClick,
  };
}
