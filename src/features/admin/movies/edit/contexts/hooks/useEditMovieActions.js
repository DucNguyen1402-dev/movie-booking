import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { ENTITIES } from "@config/admin";
import {
  createEditModalContent,
  createUnsavedChangesModalContent,
} from "@helpers/admin/modal";
import { format } from "date-fns";

import {
  useLoadingContext,
  useModalContext,
  useNotificationContext,
} from "@contexts/admin";
import { ensureMinDuration } from "@utils/admin";
import {
  MIN_LOADING_TIME,
  MODAL_TYPES,
  NOTIFICATION_TYPES,
  ROW_ACTION_TYPES,
} from "@constants/admin";

import { useUpdateMovie } from "./useUpdateMovie";

export function useEditMovieActions({ editId, editMovie, trigger, getValues }) {
  const navigate = useNavigate();

  const { mutateAsync } = useUpdateMovie();

  const { notificationActions } = useNotificationContext();
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
      type: MODAL_TYPES.UNSAVED_CHANGES,
      content: createUnsavedChangesModalContent(ENTITIES.movie),
      onConfirm: handleCancelChange,
    });

  function normalizeMovie(movie) {
    return {
      ...movie,
      ngayKhoiChieu: format(movie.ngayKhoiChieu, "yyyy-MM-dd"),
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
      notificationActions.show({
        variant: NOTIFICATION_TYPES.WARNING,
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
            variant: NOTIFICATION_TYPES.SUCCESS,
            message: "Cập nhật thông tin phim thành công.",
          },
          highlight: ROW_ACTION_TYPES.UPDATE,
        },
      });
    } catch (error) {
      hideLoading();
      const content =
        error.response?.data?.content ??
        "Đã có lỗi xảy ra. Vui lòng thử lại sau";
      //Chỗ này có vẻ là do tên phim không thể edit nhưng message trả về hơi bị sai
      // fix tạm
      const message =
        content === "Phim này không thể bị xóa!"
          ? "Phim này không thể chỉnh sửa "
          : content;
      notificationActions.show({
        variant: NOTIFICATION_TYPES.ERROR,
        message,
      });
    }
  }, [
    getValues,
    editMovie,
    modal,
    notificationActions,
    showLoading,
    mutateAsync,
    hideLoading,
    navigate,
    editId,
  ]);

  const onSaveClick = async () => {
    const isValid = await trigger();
    if (!isValid) return;
    modal.open({
      type: MODAL_TYPES.EDIT,
      content: createEditModalContent(ENTITIES.movie),
      onConfirm: handleSaveMovie,
    });
  };

  return {
    handleSaveMovie,
    onCancelClick,
    onSaveClick,
  };
}
