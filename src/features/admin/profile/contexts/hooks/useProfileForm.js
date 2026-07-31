import { useForm } from "react-hook-form";

export function useProfileForm() {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      hoTen: "",
      email: "",
      soDT: "",
      matKhau: "",
      matKhauHienTai: "",
      matKhauMoi: "",
      xacNhanMatKhauMoi: "",
    },
  });

  return {
    register,
    handleSubmit,
    getValues,
    reset,
    errors,
    isDirty,
  };
}
