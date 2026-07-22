import { useMovies } from "@features/admin/movies-management/hooks";
import { useMemo } from "react";
import { getShowtimeData } from "@features/admin/movies-management/showtime-list/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

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
