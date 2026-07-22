import { api } from "./index";

export const getUserInfor = async (account) => {
  const { data } = await api.post(
    `/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${account}`,
  );

  return data.content;
};
