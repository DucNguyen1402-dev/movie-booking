import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import * as execution from "@shared/execution";
import { loading, modal, toast } from "@shared/overlays";
import { ROW_ACTION_TYPES } from "@shared/table";
import { format } from "date-fns";

import { createUpdateFormData } from "@features/admin/movies/edit/helpers";
import { ENTITIES } from "@features/admin/shared/config";

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

  const toaster = toast.use();
  const loader = loading.use();
  const modalApi = modal.use();

  const handleCancelChange = () =>
    navigate(previousPath, {
      state: {
        movieId: editId,
        history: history.slice(0, -1),
      },
    });
  const onCancelClick = () =>
    modalApi.open({
      ...modal.config.unsavedChanges(ENTITIES.movie),
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
    const movie = getValues();

    if (!hasMovieChanged(normalizeMovie(movie), normalizeMovie(editMovie))) {
      toaster.show(
        toast.config.warning(
          "Không phát hiện thay đổi. Vui lòng chỉnh sửa trước khi lưu.",
        ),
      );

      return;
    }

    const saveMovieTask = async () => {
      const formData = createUpdateFormData(movie);
      return await mutateAsync(formData);
    };

    try {
      const { data } = await execution.runWithLoading(saveMovieTask, loader);

      navigate(previousPath, {
        state: {
          movieId: data?.content?.maPhim,
          toastState: toast.config.success.update(ENTITIES.movie),
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

      toaster.show(toast.config.error(message));
    }
  };

  const onSaveClick = async () => {
    const isValid = await trigger();
    if (!isValid) return;
    modalApi.open({
      ...modal.config.edit(ENTITIES.movie),
      onConfirm: handleSaveMovie,
    });
  };

  return {
    handleSaveMovie,
    onCancelClick,
    onSaveClick,
  };
}
