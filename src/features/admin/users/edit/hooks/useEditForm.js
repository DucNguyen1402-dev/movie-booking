import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function useEditForm({ user }) {
  const [initialUser, setInitialUser] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { defaultValues, errors, isDirty },
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInitialUser({
      hoTen: user.hoTen,
      email: user.email,
      soDT: user.soDT,
      maLoaiNguoiDung: user.maLoaiNguoiDung,
    });
  }, [reset, user]);

  const { maNhom, maLoaiNguoiDung, ...inputFields } = defaultValues;

  return {
    register,
    handleSubmit,
    fields: inputFields,
    errors,
    initialUser,
    isDirty,
  };
}
