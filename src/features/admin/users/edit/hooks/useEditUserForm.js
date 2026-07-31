import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export function useEditUserForm({ user }) {
  const [initialUser, setInitialUser] = useState(null);
  const lastUserAccount = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm();

  useEffect(() => {
    if (!user || lastUserAccount.current === user.taiKhoan) return;
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
    lastUserAccount.current = user.taiKhoan;
  }, [reset, user]);

  return {
    register,
    handleSubmit,
    errors,
    initialUser,
    isDirty,
  };
}
