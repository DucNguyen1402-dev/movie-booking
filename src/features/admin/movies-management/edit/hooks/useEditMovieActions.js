import { useCallback } from "react";
import { MODAL_TYPES } from "@constants/admin/modalTypes.js";
import { useNotification } from "@contexts/admin/NotificationContext";
import { useNavigate } from "react-router-dom";
import { useLoading } from "@contexts/admin/LoadingSpinnerContext";
import { ensureMinDuration } from "@utils/admin/ensureMinDuration";
import { MIN_LOADING_TIME } from "@constants/admin/loadingSpinner";
import { HIGHLIGHT_TYPES } from "@config/admin/movieHighlight";
import { useMutation } from "@tanstack/react-query";
import { updateMovie } from "@services/admin/api";
import { useModalContext } from "@contexts/admin/ModalContext";


export function useEditMovieActions({
  editId,
  editMovie,
  trigger,
  getValues,
}) {
  const navigate = useNavigate();
  const { mutateAsync } = useMutation({
    mutationFn: updateMovie,
  });

  const { notifActions } = useNotification();
  const { showLoading, hideLoading } = useLoading();
  const modal = useModalContext();


const handleFileChange = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();

  reader.readAsDataURL(file);
};


  const handleCancelChange = () => {
    modal.close();
    navigate("/admin/movies", {
      state: {
        movieId: editId,
      },
    });
  };

  const onCancelClick = () =>
    modal.open({
      type: MODAL_TYPES.CANCEL_MOVIE_CHANGES,
      onConfirm: handleCancelChange,
    });

  function normalizeMovie(movie) {
    return {
      ...movie,
      ngayKhoiChieu: movie.ngayKhoiChieu.split("T")[0],
    };
  }

  const hasMovieChanged = (movie, editMovie) => {
    for (const key in movie) {
      if (movie[key] !== editMovie[key]) {
        return true;
      }
    }

    return false;
  };

  const handleSaveMovie = useCallback(async () => {
    const movie = getValues();

    if (!hasMovieChanged(normalizeMovie(movie), normalizeMovie(editMovie))) {
       modal.close();
      notifActions.showNotification({
        variant: "warning",
        message: "Không phát hiện thay đổi. Vui lòng chỉnh sửa trước khi lưu.",
      });

      return;
    }

    const start = Date.now();

    const formData = new FormData();
    for (const key in movie) {
      formData.append(key, movie[key]);
    }

    try {
      modal.close();
      showLoading();
      await mutateAsync(formData);
      await ensureMinDuration(start, MIN_LOADING_TIME);
      hideLoading();
      navigate("/admin/movies", {
        state: {
          movieId: editId,
          notification: {
            variant: "success",
            message: "Update successfully",
          },
          highlight: HIGHLIGHT_TYPES.UPDATE,
        },
      });
    } catch (error) {
      hideLoading();
      const content = error.response?.data?.content;
      //Chỗ này có vẻ là do tên phim không thể edit nhưng message trả về hơi bị sai
      // fix tạm
      const message =
        content === "Phim này không thể bị xóa!"
          ? "Phim này không thể chỉnh sửa "
          : content;
      notifActions.showNotification({
        variant: "error",
        message,
      });
    }
  }, [
    mutateAsync,
    editMovie,
    editId,
    navigate,
    notifActions,
  ]);

  const onSaveClick = async () => {
    const isValid = await trigger();
    if (!isValid) return;
    modal.open({
      type: MODAL_TYPES.SAVE_MOVIE_CHANGES,
      onConfirm: handleSaveMovie,
    });
  };

  return {
    handleFileChange,
    handleSaveMovie,
    onCancelClick,
    onSaveClick,
  };
}
