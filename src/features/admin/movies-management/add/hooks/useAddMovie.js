import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { addMovie } from "@services/admin/api";
import { createMovieFormData } from "../utils/createMovieFormData";
import { useNavigate, useLocation } from "react-router-dom";
import { ensureMinDuration } from "@utils/admin/ensureMinDuration";
import { MIN_LOADING_TIME } from "@constants/admin/loadingSpinner";
import { useLoadingContext } from "@contexts/admin/loading";
import { HIGHLIGHT_TYPES } from "@config/admin/movieHighlight";
import { useNotification } from "@contexts/admin/NotificationContext";
import { useModalContext } from "@contexts/admin/modal";
import { MODAL_TYPES } from "@constants/admin/modalTypes";

export function useAddMovie() {
  const [imgPreview, setImgPreview] = useState("");
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: addMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["movies"],
      });
    },
  });
  const location = useLocation();
  const history = location.state?.history ?? [];
  const previousPath = history.at(-1) ?? "/admin/movies";
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoadingContext();
  const { notifActions } = useNotification();
  const modal = useModalContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty},
    control,
    watch,
  } = useForm({

    defaultValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      hinhAnh: "",
      maNhom: "GP01",
      danhGia: 0,
      hot: false,
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
    },
  });


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
            message: "Add successfully",
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
      notifActions.showNotification({
        variant: "error",
        message,
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => setImgPreview(e.target.result);
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
