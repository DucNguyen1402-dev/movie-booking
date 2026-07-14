import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export function useEditForm({ user }) {
  const [initialUser, setInitialUser] = useState(null);

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
      maNhom: "GP01",
      maLoaiNguoiDung: user.maLoaiNguoiDung,
    });
     setInitialUser({
        hoTen: user.hoTen,
        email: user.email,
        soDT: user.soDT,
        maLoaiNguoiDung: user.maLoaiNguoiDung,
      });
  }, [user]);

  const { maNhom, maLoaiNguoiDung, ...inputFields } = defaultValues;
  return {
    register,
    handleSubmit,
    fields: inputFields,
    errors,
    initialUser,
  };
}
