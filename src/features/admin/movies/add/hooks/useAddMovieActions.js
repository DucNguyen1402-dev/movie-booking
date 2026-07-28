import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ENTITIES } from "@config/admin";
import {
  createAddModalContent,
  createUnsavedChangesModalContent,
} from "@helpers/admin/modal";
import { runWithLoading } from "@shared/async";
import { loading } from "@shared/loading";

import { useModalContext, useNotificationContext } from "@contexts/admin";
import { createMovieFormData } from "@features/admin/movies/add/utils";
import {
  MODAL_TYPES,
  NOTIFICATION_TYPES,
  ROW_ACTION_TYPES,
} from "@constants/admin";

import { useAddForm } from "./useAddForm";
import { useAddMovie } from "./useAddMovie";

export function useAddMovieActions() {
  const [imgPreview, setImgPreview] = useState("");

  const location = useLocation();
  const history = location.state?.history ?? [];
  const previousPath = history.at(-1) ?? "/admin/movies";
  const navigate = useNavigate();

  const loader = loading.use();
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
      type: MODAL_TYPES.UNSAVED_CHANGES,
      onConfirm: handleCancelClick,
      content: createUnsavedChangesModalContent(ENTITIES.movie),
    });

  const onValid = (data) =>
    modal.open({
      type: MODAL_TYPES.ADD,
      onConfirm: () => onSubmit(data),
      content: createAddModalContent(ENTITIES.movie),
    });

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    handleSubmit(onValid)();
  };

  const onSubmit = async (data) => {
    modal.close();

    const task = async () => {
      const formData = createMovieFormData(data);

      try {
        const response = await mutateAsync(formData);
        navigate(previousPath, {
          state: {
            movieId: response.data.content.maPhim,
            highlight: ROW_ACTION_TYPES.ADD,
            notification: {
              variant: NOTIFICATION_TYPES.SUCCESS,
              message: "Phim đã được thêm thành công vào hệ thống",
            },
            history,
          },
        });
      } catch (error) {
        const content = error.response?.data?.content;
        // Chỗ này có vẻ là do tên phim bị trùng nhưng content trả về tử backend không rõ ràng
        // mình fix tạm
        const message =
          content === "Upload file không thành công!"
            ? "Tên phim đã tồn tại"
            : content;
        notificationActions.show({
          variant: NOTIFICATION_TYPES.ERROR,
          message,
        });
      }
    };

    await runWithLoading(task, loader);
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
