import { api } from "./index";

export const createUser = async (payload) => {
  const { data } = await api.post("QuanLyNguoiDung/ThemNguoiDung", payload);

  return data.content;
};