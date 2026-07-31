import { api } from "./index";

export const updateMovie = async (data) => {
  return api.post("/QuanLyPhim/CapNhatPhimUpload", data);
};
