import { api } from "./index";

export const createShowtime = async (payload) => {
  const { data } = await api.post("QuanLyDatVe/TaoLichChieu", payload);

  return data;
};