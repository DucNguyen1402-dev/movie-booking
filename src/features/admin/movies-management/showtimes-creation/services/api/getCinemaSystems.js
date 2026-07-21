import { api } from "./index";

export const getCinemaSystems = async () => {
  const { data } = await api.get("QuanLyRap/LayThongTinHeThongRap");

  return data.content;
};
