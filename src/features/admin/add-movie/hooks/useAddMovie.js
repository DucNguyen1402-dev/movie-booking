import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { addMovie } from "@services/admin/api";
import { createMovieFormData } from "../utils/createMovieFormData";
import { useNavigate } from "react-router-dom";
import { ensureMinDuration } from "@utils/admin/ensureMinDuration";
import { MIN_LOADING_TIME } from "@constants/admin/loadingSpinner";
import { useLoading } from "@contexts/admin/LoadingSpinnerContext";
import { HIGHLIGHT_TYPES } from "@config/admin/movieHighlight";
import { useNotification } from "@contexts/admin/NotificationContext";

export function useAddMovie() {
  const [imgPreview, setImgPreview] = useState("");
  const { mutateAsync } = useMutation({
    mutationFn: addMovie,
  });

  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();
  const { notifActions } = useNotification();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      maNhom: "GP01",
      danhGia: 10,
      hot: false,
      dangChieu: false,
      sapChieu: false,
    },
  });

  const onSubmit = async (data) => {
    const start = Date.now();
    showLoading();
    const formData = createMovieFormData(data);

    try {
      const response = await mutateAsync(formData);
    
      await ensureMinDuration(start, MIN_LOADING_TIME);
      hideLoading();
      navigate("/admin/movies", {
        state: {
          movieId: response.data.content.maPhim,
          highlight: HIGHLIGHT_TYPES.ADD,
          notification: {
            variant: "success",
            message: "Add successfully",
          },
        },
      });
    } catch (error) {
      const content = error.response?.data?.content;
      //Chỗ này có vẻ là do tên phim bị trùng nhưng content trả về tử backend không rõ ràng
      // fix tạm
      const message =
        content === "Upload file không thành công!"
          ? "Tên phim đã tồn tại"
          : content;

      hideLoading();
      notifActions.showNotification({
        variant: "error",
        message,
      });
      console.log(error);
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
    handleSubmit,
    errors,
    onSubmit,
    handleFileChange,
    imgPreview,
  };
}
