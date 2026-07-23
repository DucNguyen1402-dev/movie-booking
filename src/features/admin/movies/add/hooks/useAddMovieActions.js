import { useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import {
  useLoadingContext,
  useNotificationContext,
  useModalContext,
} from "@contexts/admin";

import { useAddMovie } from "./useAddMovie";
import { useAddForm } from "./useAddForm";

import { MIN_LOADING_TIME, MODAL_TYPES } from "@constants/admin";
import { HIGHLIGHT_TYPES } from "@config/admin";

import { ensureMinDuration } from "@utils/admin";
import { createMovieFormData } from "@features/admin/movies/add/utils";


export function useAddMovieActions() {
  const [imgPreview, setImgPreview] = useState("");

  const location = useLocation();
  const history = location.state?.history ?? [];
  const previousPath = history.at(-1) ?? "/admin/movies";
  const navigate = useNavigate();

  const { showLoading, hideLoading } = useLoadingContext();
  const { notificationActions } = useNotificationContext();
  const modal = useModalContext();

  const { register, handleSubmit, errors, isDirty, control, watch } =
    useAddForm();

  const { mutateAsync } = useAddMovie();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => setImgPreview(e.target.result);
    }
  };

  const handleCancelClick = () => {
    modal.close();
    navigate(previousPath, { state: { history: history.slice(0, -1) } });
  };

  const onCancelClick = () =>
    modal.open({
      type: MODAL_TYPES.ADDING_MOVIE,
      title: "Bạn có chắc muốn hủy?",
      subtitle: "Mọi thông tin sẽ không được lưu lại.",
      onConfirm: handleCancelClick,
    });

  const onValid = (data) =>
    modal.open({
      type: MODAL_TYPES.ADDING_MOVIE,
      title: "Bạn có chắc muốn tạo phim?",
      subtitle: "Hệ thống sẽ tạo phim mới với thông tin bạn đã nhập.",
      onConfirm: () => onSubmit(data),
    });

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    handleSubmit(onValid)();
  };

  const onSubmit = async (data) => {
    modal.close();
    const start = Date.now();
    showLoading();
    const formData = createMovieFormData(data);

    try {
      const response = await mutateAsync(formData);

      await ensureMinDuration(start, MIN_LOADING_TIME);
      hideLoading();
      navigate(previousPath, {
        state: {
          movieId: response.data.content.maPhim,
          highlight: HIGHLIGHT_TYPES.ADD,
          notification: {
            variant: "success",
            message: "Phim đã được thêm thành công vào hệ thống",
          },
          history,
        },
      });
    } catch (error) {
      const content = error.response?.data?.content;
      //Chỗ này có vẻ là do tên phim bị trùng nhưng content trả về tử backend không rõ ràng
      // mình fix tạm
      const message =
        content === "Upload file không thành công!"
          ? "Tên phim đã tồn tại"
          : content;

      hideLoading();
      notificationActions.show({
        variant: "error",
        message,
      });
    }
  };

  return {
    register,
    handleSubmitEvent,
    errors,
    handleFileChange,
    imgPreview,
    onCancelClick,
    watch,
    control,
    isDirty,
  };
}
