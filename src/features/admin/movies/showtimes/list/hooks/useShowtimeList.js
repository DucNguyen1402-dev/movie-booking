import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { useMovies } from "@features/admin/movies/hooks";
import { getShowtimeData } from "@features/admin/movies/showtimes/list/api";

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
  } = useQuery({
    queryFn: () => getShowtimeData(showtimeMovie?.maPhim),
    queryKey: ["showtimeData", showtimeMovie],
    enabled: !!showtimeMovie,
  });

  const showtimeInfor = showtimeData.heThongRapChieu ?? [];
  const hasNoShowtime = isSuccess && showtimeInfor.length === 0;

  return {
    showtimeInfor,
    hasNoShowtime,
    showtimeMovie,
    isPending
  };
}
