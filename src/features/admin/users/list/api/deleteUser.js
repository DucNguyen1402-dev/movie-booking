import {api} from "./index"

export const deleteUser = async (account) => {
  const { data } = await api.delete(
    `QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${account}`,
  );

  return data.content;
};
