import { api } from "./index";

export const getMovies = async () => {
  const response = await api.get("/QuanLyPhim/LayDanhSachPhim", {
    params: {
      maNhom: "GP01",
    },
  });

  return response.data.content;
};