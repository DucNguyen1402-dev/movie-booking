import { api } from "./index";


export const getCinemaClusters = async (system) => {
  const { data } = await api.get(
    `QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${system}`,
  );

  return data.content;
};