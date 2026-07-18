import { login } from "@services/admin/api";

export async function useLogin() {
  const response = await login({
    taiKhoan: "Adm08",
    matKhau: "123456",
  });
  localStorage.setItem("accessToken", response.data.content.accessToken);
}
