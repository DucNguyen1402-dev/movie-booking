import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { addMovie } from "@services/admin/api";
import { createMovieFormData } from "../utils/createMovieFormData";
import { useNavigate } from "react-router-dom";
import { ensureMinDuration } from "@utils/admin/ensureMinDuration";
import { MIN_LOADING_TIME } from "@constants/admin/loadingSpinner";
import {useLoading} from "@contexts/admin/LoadingSpinnerContext"

export function useAddMovie() {
  const [imgPreview, setImgPreview] = useState("");
  const { mutateAsync } = useMutation({
    mutationFn: addMovie,
  });
  
  const navigate = useNavigate();
  const {showLoading, hideLoading}  =useLoading();

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
      hideLoading();
      await ensureMinDuration(start, MIN_LOADING_TIME);
     
      navigate("/admin/movies", {
       state:{
          addedMovieId: response.data.content.maPhim
       }
      });
    } catch (error) {
      console.log(error)
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
