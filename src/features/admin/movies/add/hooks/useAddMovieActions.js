import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ENTITIES } from "@config/admin";
import { runWithLoading } from "@shared/async";
import { loading, modal } from "@shared/overlays";
import { ROW_ACTION_TYPES } from "@shared/table";
import { toast, toastContent } from "@shared/toast";

import { createMovieFormData } from "@features/admin/movies/add/utils";

import { useAddForm } from "./useAddForm";
import { useAddMovieMutation } from "./useAddMovieMutation";

export function useAddMovieActions() {
  const [imgPreview, setImgPreview] = useState("");

  const location = useLocation();
  const history = location.state?.history ?? [];
  const previousPath = history.at(-1) ?? "/admin/movies";
  const navigate = useNavigate();

  const loader = loading.use();
  const toaster = toast.use();
  const modalApi = modal.use();

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

  const handleCancelClick = () =>
    navigate(previousPath, { state: { history: history.slice(0, -1) } });
  const onCancelClick = () =>
    modalApi.open({
      ...modal.config.unsavedChanges(ENTITIES.movie),
      onConfirm: handleCancelClick,
    });

  const onValid = (data) =>
    modalApi.open({
      ...modal.config.createAddModal(ENTITIES.movie),
      onConfirm: () => handleSubmitNewMovie(data),
    });

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    handleSubmit(onValid)();
  };

  const handleSubmitNewMovie = async (data) => {
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
          toastState: toastContent.success.add(ENTITIES.movie),
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
      toaster.show(toastContent.error(message));
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
