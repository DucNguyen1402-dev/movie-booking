import { useForm } from "react-hook-form";
import { useEffect } from "react";

export function useEditForm({ user }) {
  const {
    register,
    handleSubmit,
    formState: { defaultValues, errors },
    reset,
  } = useForm({
    mode: "onBlur",
    defaultValues: {},
  });

  useEffect(() => {
    if (!user) return;
    reset({
      taiKhoan: user.taiKhoan,
      hoTen: user.hoTen,
      matKhau: user.matKhau,
      email: user.email,
      soDT: user.soDT,
    });
  }, [user]);

  return {
    register,
    handleSubmit,
    fields: defaultValues,
    errors,
  };
}
