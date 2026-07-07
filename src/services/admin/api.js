import { api } from "./client";

export const getUsers = async () => {
  const response = await api.get("/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung");

  return response.data.content;
};

export const getMovies = async () => {
  const response = await api.get("/QuanLyPhim/LayDanhSachPhim", {
    params: {
      maNhom: "GP01",
    },
  });

  return response.data.content;
};

export const deleteMovie = async (id) => {
  return api.delete("/QuanLyPhim/XoaPhim", {
    params: {
      maPhim: id,
    },
  });
};

export const updateMovie = async (data) => {
  return api.post("/QuanLyPhim/CapNhatPhimUpload", data);
};

export const login = (data) => {
  return api.post("/QuanLyNguoiDung/DangNhap", data);
};

export const addMovie = async (data) => {
  return api.post("/QuanLyPhim/ThemPhimUploadHinh", data);
};
