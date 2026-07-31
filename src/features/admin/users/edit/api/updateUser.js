import {api} from "./index"

export const updateUser = async (payload) => {
  const { data } = await api.post(
    "QuanLyNguoiDung/CapNhatThongTinNguoiDung",
    payload,
  );

  return data.content;
};