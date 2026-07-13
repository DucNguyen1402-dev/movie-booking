import customerClient from "./client";

export const authApi = {
  login: (data) => {
    return customerClient.post("/QuanLyNguoiDung/DangNhap", data);
  },

  register: (data) => {
    return customerClient.post("/QuanLyNguoiDung/DangKy", data);
  },

  getAccountInfo: () => {
    return customerClient.post("/QuanLyNguoiDung/ThongTinTaiKhoan");
  },

  updateAccountInfo: (data) => {
    return customerClient.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", data);
  },
};