import { useEffect, useRef } from "react";

export function useProfileEffect({ loginedUser, reset }) {
  const lastProfileAccount = useRef(null);

  useEffect(() => {
    if (!loginedUser) return;
    if (lastProfileAccount.current === loginedUser.taiKhoan) return;
    reset({
      taiKhoan: loginedUser.taiKhoan,
      hoTen: loginedUser.hoTen,
      email: loginedUser.email,
      soDT: loginedUser.soDT,
      matKhau: loginedUser.matKhau,
      matKhauHienTai: "",
      matKhauMoi: "",
      xacNhanMatKhauMoi: "",
    });
    lastProfileAccount.current === loginedUser.taiKhoan;
  }, [loginedUser, reset]);
}
