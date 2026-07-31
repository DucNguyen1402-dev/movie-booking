import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { useMovies } from "@features/admin/movies/hooks";

import { useShowtimeData } from ".";

export function useShowtimeList() {
  const { id } = useParams();
  const { data: movies = [] } = useMovies();

  const showtimeMovie = useMemo(() => {
    const movie = movies.find((movie) => movie.maPhim === Number(id));
    if (!movie) return null;
    return {
      ...movie,
      ngayKhoiChieu: movie.ngayKhoiChieu.split("T")[0],
    };
  }, [id, movies]);

  const {
    data: showtimeData = [],
    isPending,
    isSuccess,
  } = useShowtimeData({ movieId: showtimeMovie?.maPhim });

  const showtimeInfor = showtimeData.heThongRapChieu ?? [];
  const hasNoShowtime = isSuccess && showtimeInfor.length === 0;

  return {
    showtimeInfor,
    hasNoShowtime,
    showtimeMovie,
    isPending,
  };
}
