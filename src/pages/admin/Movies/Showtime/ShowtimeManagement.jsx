import { useMovies } from "@hooks/admin/useMovies";
import { useMemo, useState, useEffect } from "react";
import { getShowtimeData } from "@services/admin/api";
import MovieSelectionCard from "@features/admin/movies-management/showtimes-management/components/MovieSelectionCard";
import ShowtimeCard from "@features/admin/movies-management/showtimes-management/components/ShowtimeCard/ShowtimeCard";
import { useMutation } from "@tanstack/react-query";
import { useParams, useLocation} from "react-router-dom";

export default function ShowtimeManagement() {
  const { id } = useParams();
  const location = useLocation();
 

  const [showtimeData, setShowtimeData] = useState([]);

  const { data: movies = [] } = useMovies();

  const targetMovie = useMemo(() => {
    const movie = movies.find((movie) => movie.maPhim === Number(id));
    if (!movie) return null;
    return {
      ...movie,
      ngayKhoiChieu: movie.ngayKhoiChieu.split("T")[0],
    };
  }, [id, movies]);


    const {mutateAsync, isPending, isSuccess } = useMutation({
        mutationFn: getShowtimeData,
    })

    useEffect(() => {
    if (!targetMovie) return;

    const fetchData = async () => {
      const data = await mutateAsync(targetMovie.maPhim);
      setShowtimeData(data);
    };

    fetchData();
  }, [targetMovie]);

   const showtimeInfor = showtimeData.heThongRapChieu ?? [];
   const hasNoData = isSuccess && showtimeInfor.length === 0;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 py-10">
      <div className="mx-auto mt-2 flex max-w-[90%] gap-4 space-y-2">
        <MovieSelectionCard
          movie={targetMovie ?? {}}
          hasNoData = {hasNoData}
          
        />
        <ShowtimeCard showtimeInfor={showtimeData.heThongRapChieu ?? []} isPending = {isPending} hasNoData = {hasNoData}/>
      </div>
    </div>
  );
}
