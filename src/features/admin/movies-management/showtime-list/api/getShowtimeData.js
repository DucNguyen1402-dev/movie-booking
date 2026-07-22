import { api } from "./index";

export const getShowtimeData = async (id) => {
  const { data } = await api.get(
    `QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`,
  );

  return data.content;
};