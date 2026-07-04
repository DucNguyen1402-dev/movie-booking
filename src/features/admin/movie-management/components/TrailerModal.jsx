import { selectTrailerId } from "@features/admin/movie-management/redux/selectors";
import { setTrailerState } from "@features/admin/movie-management/redux/slice";
import { useSelector } from "react-redux";
import { useProcessedMovies } from "../hooks/useProcessedMovies";
import { CircleX } from "lucide-react";
import { useDispatch } from "react-redux";

export default function TrailerModal() {
  const movies = useProcessedMovies();
  const dispatch = useDispatch();
  const trailerId = useSelector(selectTrailerId);
  const tartgetMovie = movies.find((movie) => movie.maPhim === trailerId);
  const embedUrl = tartgetMovie.trailer.replace("watch?v=", "embed/");
  const onClose = () => dispatch(setTrailerState(false));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div
        className="relative w-full max-w-4xl overflow-hidden rounded-xl bg-zinc-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-700 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">
            {tartgetMovie.tenPhim} Trailer
          </h2>

          <button
            className="cursor-pointer text-2xl text-gray-400 transition-colors duration-300 hover:text-white"
            onClick={onClose}
          >
            <CircleX />
          </button>
        </div>

        {/* Video */}
        <div className="aspect-video w-full">
          <iframe
            className="h-full w-full"
            src={embedUrl}
            title={tartgetMovie.tenPhim}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
