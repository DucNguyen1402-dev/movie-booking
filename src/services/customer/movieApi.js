import customerClient from "./client";

export const movieApi = {
  getBannerList: () => {
    return customerClient.get("/QuanLyPhim/LayDanhSachBanner");
  },

  getMovieList: ({ maNhom = "GP01", tenPhim = "" } = {}) => {
    const params = {
      maNhom,
    };

    if (tenPhim.trim()) {
      params.tenPhim = tenPhim.trim();
    }

    return customerClient.get("/QuanLyPhim/LayDanhSachPhim", {
      params,
    });
  },

  getMovieListPagination: ({
    maNhom = "GP01",
    tenPhim = "",
    soTrang = 1,
    soPhanTuTrenTrang = 10,
  } = {}) => {
    const params = {
      maNhom,
      soTrang,
      soPhanTuTrenTrang,
    };

    if (tenPhim.trim()) {
      params.tenPhim = tenPhim.trim();
    }

    return customerClient.get("/QuanLyPhim/LayDanhSachPhimPhanTrang", {
      params,
    });
  },

  getMovieInfo: (maPhim) => {
    return customerClient.get("/QuanLyPhim/LayThongTinPhim", {
      params: {
        maPhim,
      },
    });
  },
};