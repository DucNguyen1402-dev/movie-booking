import { useForm } from "react-hook-form";

export function useAddForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      email: "",
      soDt: "",
      maLoaiNguoiDung: "KhachHang",
    },
  });

  return {
    register,
    errors,
    handleSubmit,
  };
}
