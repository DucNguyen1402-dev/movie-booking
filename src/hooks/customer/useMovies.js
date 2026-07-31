import { useQuery } from "@tanstack/react-query";

import { movieApi } from "@/services/customer/movieApi";

export const useBannerList = () => {
  return useQuery({
    queryKey: ["customer", "bannerList"],
    queryFn: async () => {
      const response = await movieApi.getBannerList();
      return response.data.content;
    },
  });
};

export const useMovieList = (maNhom = "GP01", tenPhim = "") => {
  return useQuery({
    queryKey: ["customer", "movieList", maNhom, tenPhim],
    queryFn: async () => {
      const response = await movieApi.getMovieList({
        maNhom,
        tenPhim,
      });

      return response.data.content;
    },
  });
};

export const useMovieListPagination = ({
  maNhom = "GP01",
  tenPhim = "",
  soTrang = 1,
  soPhanTuTrenTrang = 10,
} = {}) => {
  return useQuery({
    queryKey: [
      "customer",
      "movieListPagination",
      maNhom,
      tenPhim,
      soTrang,
      soPhanTuTrenTrang,
    ],
    queryFn: async () => {
      const response = await movieApi.getMovieListPagination({
        maNhom,
        tenPhim,
        soTrang,
        soPhanTuTrenTrang,
      });

      return response.data.content;
    },
  });
};

export const useMovieInfo = (maPhim) => {
  return useQuery({
    queryKey: ["customer", "movieInfo", maPhim],
    queryFn: async () => {
      const response = await movieApi.getMovieInfo(maPhim);
      return response.data.content;
    },
    enabled: Boolean(maPhim),
  });
};