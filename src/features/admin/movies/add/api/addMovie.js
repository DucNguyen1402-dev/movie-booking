import { api } from "./index";


export const addMovie = async (data) => {
  return api.post("/QuanLyPhim/ThemPhimUploadHinh", data);
};
