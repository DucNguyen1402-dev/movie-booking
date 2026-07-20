import { useCallback } from "react";
import { MODAL_TYPES } from "@constants/admin/modalTypes.js";
import { useNotification } from "@contexts/admin/NotificationContext";
import { useNavigate } from "react-router-dom";
import { useLoadingContext } from "@contexts/admin/loading";
import { ensureMinDuration } from "@utils/admin/ensureMinDuration";
import { MIN_LOADING_TIME } from "@constants/admin/loadingSpinner";
import { HIGHLIGHT_TYPES } from "@config/admin/movieHighlight";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMovie } from "@services/admin/api";
import { useModalContext } from "@contexts/admin/modal";
import { format } from "date-fns";

export function useEditMovieActions({
  editId,
  editMovie,
  trigger,
  getValues,
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: updateMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["movies"],
      });
    },
  });


  const { notifActions } = useNotification();
  const { showLoading, hideLoading } = useLoadingContext();
  const modal = useModalContext();

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
      type: MODAL_TYPES.EDIT_MOVIE,
      title:"Bạn có chắc muốn hủy?",
      subtitle: "Mọi thông tin của bạn sẽ không được lưu.",
      onConfirm: handleCancelChange,
    });

  function normalizeMovie(movie) {
    return {
      ...movie,
      ngayKhoiChieu:format(movie.ngayKhoiChieu, "yyyy-MM-dd"),
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

    Object.entries(movie).forEach(([key, value]) => {
      if (key === "ngayKhoiChieu") {
        formData.append(key, format(value, "dd/MM/yyyy"));
        return;
      }

      if (key === "hinhAnh") {
        const file = value?.[0];
        if (file) {
          formData.append("File", file);
        }
        return;
      }

      formData.append(key, value);
    });

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
  }, [mutateAsync, editMovie, editId, navigate, notifActions]);

  const onSaveClick = async () => {
    const isValid = await trigger();
    if (!isValid) return;
    modal.open({
      type: MODAL_TYPES.EDIT_MOVIE,
      title:"Bạn có chắc muốn lưu?",
      subtitle: "Thông tin của người dùng sẽ được thay đổi trên hệ thống.",
      onConfirm: handleSaveMovie,
    });
  };

  return {
    handleSaveMovie,
    onCancelClick,
    onSaveClick,
  };
}
