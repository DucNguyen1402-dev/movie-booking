import { useEffect } from "react";

export function useProfileEffect({ loginedUser, reset }) {
  useEffect(() => {
    if (!loginedUser) return;

    reset({
      taiKhoan: loginedUser.taiKhoan,
      hoTen: loginedUser.hoTen,
      email: loginedUser.email,
      soDT: loginedUser.soDT,
      matKhau: loginedUser.matKhau,
    });
  }, [loginedUser, reset]);
}
