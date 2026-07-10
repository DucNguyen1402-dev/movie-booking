import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useMovies } from "@hooks/admin/useMovies";
import { useMemo, useState , useEffect} from "react";
import { getShowtimeData } from "@services/admin/api";
import MovieSelectionCard from "@features/admin/movies-management/showtimes-management/components/MovieSelectionCard";
import ShowtimeCard from "@features/admin/movies-management/showtimes-management/components/ShowtimeCard/ShowtimeCard";

export default function ShowtimeManagement() {
  const { id } = useParams();
  const [showtimeData, setShowtimeData] = useState([]);  
  const location = useLocation();
  const navigate = useNavigate();
  const { data: movies = [] } = useMovies();

  const targetMovie = useMemo(() => {
    const movie = movies.find((movie) => movie.maPhim === Number(id));
    if (!movie) return {};
    return {
      ...movie,
      ngayKhoiChieu: movie.ngayKhoiChieu.split("T")[0],
    };
  }, [id, movies]);

  const onShowtimeCreationClick = () =>
    navigate(`/admin/movies/showtimes/${id}/add`, {
      state: {
        history: [...(location.state?.history ?? []), location.pathname],
      },
    });


useEffect(() => {
  if (!targetMovie) return;

  const fetchData = async () => {
    const data = await getShowtimeData(targetMovie.maPhim);
    setShowtimeData(data);
  };

  fetchData();
}, [targetMovie]);


  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 py-10">
      <div className="mx-auto mt-2 flex max-w-[90%] gap-4 space-y-2">
        <MovieSelectionCard
          movie={targetMovie}
          onShowtimeCreationClick={onShowtimeCreationClick}
        />
        <ShowtimeCard showtimeData = {showtimeData.heThongRapChieu}/>
      </div>
    </div>
  );
}
