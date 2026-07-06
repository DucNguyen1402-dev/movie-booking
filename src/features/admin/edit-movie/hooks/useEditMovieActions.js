import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useUpdateMovie } from "@hooks/useUpdateMovie";
import { MODAL_TYPES } from "@constants/admin/modalTypes.js";
import { NUMBER_FIELDS } from "@constants/admin/movies";
import {
  setModalState,
  setConfirmUpdate,
  setUpdateState,
} from "@features/admin/movie-management/redux/slice";

export function useEditMovieActions({
  movie,
  setMovie,
  setImgPreview,
  editMovie,
}) {
  const dispatch = useDispatch();
  const { mutate } = useUpdateMovie();

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
    dispatch(setModalState({ type: MODAL_TYPES.CANCEL_MOVIE_CHANGES }));


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

  const handleSaveMovie = useCallback(() => {

    if (!hasMovieChanged(normalizeMovie(movie), normalizeMovie(editMovie))) {
      dispatch(setModalState({ type: null }));
      dispatch(
        setUpdateState({
          type: "warning",
          message:
            "Không phát hiện thay đổi. Vui lòng chỉnh sửa trước khi lưu.",
        }),
      );
      setTimeout(() => {
        dispatch(setUpdateState({ type: null, message: null }));
        dispatch(setConfirmUpdate(false));
      }, 5000);

      return;
    }

    const formData = new FormData();

    for (const key in movie) {
      formData.append(key, movie[key]);
    }

    mutate(formData);
  }, [movie, mutate]);

  const onSaveClick = () =>
    dispatch(setModalState({ type: MODAL_TYPES.SAVE_MOVIE_CHANGES }));

  return {
    handleChange,
    handleCheckbox,
    handleFileChange,
    handleSaveMovie,
    onCancelClick,
    onSaveClick,
  };
}
