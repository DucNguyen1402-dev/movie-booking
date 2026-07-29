import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ENTITIES } from "@config/admin";
import {
  createAddModalContent,
  createUnsavedChangesModalContent,
} from "@helpers/admin/modal";
import { runWithLoading } from "@shared/async";
import { loading } from "@shared/loading";
import { notification } from "@shared/notification";

import { useModalContext } from "@contexts/admin";
import { createMovieFormData } from "@features/admin/movies/add/utils";
import {
  MODAL_TYPES,
  NOTIFICATION_TYPES,
  ROW_ACTION_TYPES,
} from "@constants/admin";

import { useAddForm } from "./useAddForm";
import { useAddMovieMutation } from "./useAddMovieMutation";

export function useAddMovieActions() {
  const [imgPreview, setImgPreview] = useState("");

  const location = useLocation();
  const history = location.state?.history ?? [];
  const previousPath = history.at(-1) ?? "/admin/movies";
  const navigate = useNavigate();

  const loader = loading.use();
  const notifier = notification.use();
  const modal = useModalContext();

  const { register, handleSubmit, errors, isDirty, control, watch } =
    useAddForm();

  const { mutateAsync } = useAddMovieMutation();

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
      onConfirm: () => handleSubmitNewMovie(data),
      content: createAddModalContent(ENTITIES.movie),
    });

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    handleSubmit(onValid)();
  };

  const handleSubmitNewMovie = async (data) => {
    modal.close();

    const submitNewMovieTask = async () => {
      const formData = createMovieFormData(data);
      return await mutateAsync(formData);
    };

    try {
      const response = await runWithLoading(submitNewMovieTask, loader);

      navigate(previousPath, {
        state: {
          movieId: response.data?.content?.maPhim,
          highlight: ROW_ACTION_TYPES.ADD,
          notificationState: {
            variant: NOTIFICATION_TYPES.SUCCESS,
            message: "Phim đã được thêm thành công vào hệ thống",
          },
          history,
        },
      });
    } catch (error) {
      console.log("throw:", error?.message);
      const content = error.response?.data?.content;
      // Chỗ này có vẻ là do tên phim bị trùng nhưng content trả về tử backend không rõ ràng
      // mình fix tạm
      const message =
        content === "Upload file không thành công!"
          ? "Tên phim đã tồn tại"
          : content;
      notifier.show({
        variant: NOTIFICATION_TYPES.ERROR,
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
