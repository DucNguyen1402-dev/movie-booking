import customerClient from "./client";

export const cinemaApi = {
  getCinemaSystems: () => {
    return customerClient.get("/QuanLyRap/LayThongTinHeThongRap");
  },

  getCinemaClustersBySystem: (maHeThongRap) => {
    return customerClient.get("/QuanLyRap/LayThongTinCumRapTheoHeThong", {
      params: {
        maHeThongRap,
      },
    });
  },

  getCinemaShowtimeBySystem: (maHeThongRap, maNhom = "GP01") => {
    return customerClient.get("/QuanLyRap/LayThongTinLichChieuHeThongRap", {
      params: {
        maHeThongRap,
        maNhom,
      },
    });
  },

  getMovieShowtime: (maPhim) => {
    return customerClient.get("/QuanLyRap/LayThongTinLichChieuPhim", {
      params: {
        MaPhim: maPhim,
      },
    });
  },
};