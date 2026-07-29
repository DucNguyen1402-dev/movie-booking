import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ENTITIES } from "@config/admin";
import {
  createEditModalContent,
  createUnsavedChangesModalContent,
} from "@helpers/admin/modal";
import { runWithLoading } from "@shared/async";
import { loading } from "@shared/loading";
import { notification } from "@shared/notification";
import { format } from "date-fns";

import { useModalContext } from "@contexts/admin";
import { createUpdateFormData } from "@features/admin/movies/edit/helpers";
import {
  MODAL_TYPES,
  NOTIFICATION_TYPES,
  ROW_ACTION_TYPES,
} from "@constants/admin";

import { useUpdateMovie } from "./useUpdateMovie";

export function useEditMovieActions({ editId, editMovie, trigger, getValues }) {
  const navigate = useNavigate();
  const location = useLocation();
  const history = useMemo(
    () => location.state?.history ?? [],
    [location.state?.history],
  );
  const previousPath = history.at(-1) ?? "/admin/movies";

  const { mutateAsync } = useUpdateMovie();

  const notifier = notification.use();
  const loader = loading.use();
  const modal = useModalContext();

  const handleCancelChange = () => {
    modal.close();
    navigate(previousPath, {
      state: {
        movieId: editId,
        history: history.slice(0, -1),
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

  const handleSaveMovie = async () => {
    modal.close();

    const movie = getValues();

    if (!hasMovieChanged(normalizeMovie(movie), normalizeMovie(editMovie))) {
      notifier.show({
        variant: NOTIFICATION_TYPES.WARNING,
        message: "Không phát hiện thay đổi. Vui lòng chỉnh sửa trước khi lưu.",
      });

      return;
    }

    const saveMovieTask = async () => {
      const formData = createUpdateFormData(movie);
      return await mutateAsync(formData);
    };

    try {
      const { data } = await runWithLoading(saveMovieTask, loader);

      navigate(previousPath, {
        state: {
          movieId: data?.content?.maPhim,
          notificationState: {
            variant: NOTIFICATION_TYPES.SUCCESS,
            message: "Cập nhật thông tin phim thành công.",
          },
          highlight: ROW_ACTION_TYPES.UPDATE,
          history: history.slice(0, -1),
        },
      });
    } catch (error) {
      const content =
        error.response?.data?.content ??
        "Đã có lỗi xảy ra. Vui lòng thử lại sau";
      //Chỗ này có vẻ là do tên phim không thể edit nhưng message trả về hơi bị sai
      // fix tạm
      const message =
        content === "Phim này không thể bị xóa!"
          ? "Phim này không thể chỉnh sửa "
          : content;
      notifier.show({
        variant: NOTIFICATION_TYPES.ERROR,
        message,
      });
    }
  };

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
