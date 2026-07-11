import { login } from "@services/admin/api";

export async function useLogin() {
  const response = await login({
    taiKhoan: "adminbt",
    matKhau: "12345678",
  });
  localStorage.setItem("accessToken", response.data.content.accessToken);
}
