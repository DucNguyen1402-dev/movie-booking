import { useQuery } from "@tanstack/react-query";
import { cinemaApi } from "@/services/customer/cinemaApi";

export const useCinemaSystems = () => {
  return useQuery({
    queryKey: ["customer", "cinemaSystems"],
    queryFn: async () => {
      const response = await cinemaApi.getCinemaSystems();
      return response.data.content;
    },
  });
};

export const useCinemaClustersBySystem = (maHeThongRap) => {
  return useQuery({
    queryKey: ["customer", "cinemaClusters", maHeThongRap],
    queryFn: async () => {
      const response = await cinemaApi.getCinemaClustersBySystem(maHeThongRap);
      return response.data.content;
    },
    enabled: Boolean(maHeThongRap),
  });
};

export const useCinemaShowtimeBySystem = (
  maHeThongRap,
  maNhom = "GP01",
) => {
  return useQuery({
    queryKey: ["customer", "cinemaShowtimeBySystem", maHeThongRap, maNhom],
    queryFn: async () => {
      const response = await cinemaApi.getCinemaShowtimeBySystem(
        maHeThongRap,
        maNhom,
      );

      return response.data.content;
    },
    enabled: Boolean(maHeThongRap),
  });
};

export const useMovieShowtime = (maPhim) => {
  return useQuery({
    queryKey: ["customer", "movieShowtime", maPhim],
    queryFn: async () => {
      const response = await cinemaApi.getMovieShowtime(maPhim);
      return response.data.content;
    },
    enabled: Boolean(maPhim),
  });
};