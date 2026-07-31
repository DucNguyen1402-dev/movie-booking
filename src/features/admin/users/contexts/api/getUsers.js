import { api } from "./index";

export const getUsers = async () => {
  const response = await api.get(
    "QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01",
  );

  return response.data.content;
};
