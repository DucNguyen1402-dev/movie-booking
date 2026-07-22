import { api } from "./index";

export const deleteMovie = async (id) => {
  return api.delete("/QuanLyPhim/XoaPhim", {
    params: {
      maPhim: id,
    },
  });
};

