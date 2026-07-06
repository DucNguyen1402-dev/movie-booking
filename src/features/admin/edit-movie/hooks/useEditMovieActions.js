import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useUpdateMovie } from "@hooks/useUpdateMovie";
import { MODAL_TYPES } from "@constants/admin/modalTypes.js";
import { NUMBER_FIELDS } from "@constants/admin/movies";
import {
  setModalState,
  setConfirmUpdate,
} from "@features/admin/movie-management/redux/slice";
import { useNotification } from "@contexts/admin/Notification/NotificationContext";
import { useNavigate, useParams } from "react-router-dom";
import { useLoading } from "@contexts/admin/LoadingSpinnerContext";
import { ensureMinDuration } from "@utils/admin/ensureMinDuration";
import { MIN_LOADING_TIME } from "@constants/admin/loadingSpinner";
export function useEditMovieActions({
  movie,
  setMovie,
  setImgPreview,
  editMovie,
}) {
  const reduxDispatch = useDispatch();
  const { mutateAsync } = useUpdateMovie();

  const { notifActions } = useNotification();
  const { id: editId } = useParams();
  const { showLoading, hideLoading } = useLoading();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prev) => ({
      ...prev,
      [name]: NUMBER_FIELDS.includes(name) ? Number(value) : value,
    }));
  };

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setMovie((prev) => ({ ...prev, [name]: checked }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
        setMovie((prev) => ({ ...prev, hinhAnh: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const onCancelClick = () =>
    reduxDispatch(setModalState({ type: MODAL_TYPES.CANCEL_MOVIE_CHANGES }));

  function normalizeMovie(movie) {
    return {
      ...movie,
      ngayKhoiChieu: movie.ngayKhoiChieu.split("T")[0],
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
    if (!hasMovieChanged(normalizeMovie(movie), normalizeMovie(editMovie))) {
      reduxDispatch(setModalState({ type: null }));
      notifActions.showNotification({
        variant: "warning",
        message: "Không phát hiện thay đổi. Vui lòng chỉnh sửa trước khi lưu.",
      });
      reduxDispatch(setConfirmUpdate(false));

      return;
    }

    const start = Date.now();

    const formData = new FormData();
    for (const key in movie) {
      formData.append(key, movie[key]);
    }

    try {
      reduxDispatch(setModalState({ type: null }));
      showLoading();
      await mutateAsync(formData);
      await ensureMinDuration(start, MIN_LOADING_TIME);
      hideLoading();
      navigate("/admin/movies", {
        state: {
          updatedMovieId: editId,
          notification: {
            variant: "success",
            message: "Update successfully",
          },
        },
      });
    } catch (error) {
      console.log(error);
      console.log(error.response);
      notifActions.showNotification({
        variant: "error",
        message: error.response?.data?.content ?? "Something went wrong! try again",
      });
    } finally {
      reduxDispatch(setConfirmUpdate(false));
    }
  }, [
    movie,
    mutateAsync,
    editMovie,
    editId,
    navigate,
    notifActions,
    reduxDispatch,
  ]);

  const onSaveClick = () =>
    reduxDispatch(setModalState({ type: MODAL_TYPES.SAVE_MOVIE_CHANGES }));

  return {
    handleChange,
    handleCheckbox,
    handleFileChange,
    handleSaveMovie,
    onCancelClick,
    onSaveClick,
  };
}
