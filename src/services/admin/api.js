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

export const getCinemaSystems = async () => {
  const { data } = await api.get("QuanLyRap/LayThongTinHeThongRap");

  return data.content;
};

export const getCinemaClusters = async (system) => {
  const { data } = await api.get(
    `QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${system}`,
  );

  return data.content;
};

export const createShowtime = async (payload) => {
  const { data } = await api.post("QuanLyDatVe/TaoLichChieu", payload);

  return data;
};

export const getShowtimeData = async (id) => {
  const { data } = await api.get(
    `QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`,
  );

  return data.content;
};
