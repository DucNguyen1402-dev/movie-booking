import { useForm } from "react-hook-form";

export function useAddForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
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

  return {
    register,
    handleSubmit,
    errors,
    isDirty,
    control,
    watch,
  };
}
