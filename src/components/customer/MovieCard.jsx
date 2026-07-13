import {
  CalendarDays,
  Info,
  Play,
  Star,
  Ticket,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const getMovieAgeLabel = (movie) => {
  if (movie?.danhGia >= 8) return "T18";
  if (movie?.danhGia >= 6) return "T16";

  return "T13";
};

const getMovieStatus = (movie) => {
  if (movie?.hot) return "Phim hot";
  if (movie?.dangChieu) return "Đang chiếu";

  return "Cập nhật";
};

const formatMovieDate = (dateValue) => {
  if (!dateValue) return "Đang cập nhật";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Đang cập nhật";
  }

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  if (!movie) return null;

  const movieId = movie.maPhim;
  const movieName =
    movie.tenPhim || "Đang cập nhật";
  const movieImage = movie.hinhAnh;
  const movieRating = movie.danhGia || 0;
  const movieDate = formatMovieDate(
    movie.ngayKhoiChieu,
  );
  const ageLabel = getMovieAgeLabel(movie);
  const movieStatus = getMovieStatus(movie);

  const handleGoToDetail = () => {
    navigate(`/detail/${movieId}`);
  };

  return (
    <article className="group w-[210px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#1b1b1b] shadow-[0_16px_50px_rgba(0,0,0,0.38)] transition duration-300 hover:-translate-y-1 hover:border-[#f5c518]/60">
      <div className="relative h-[315px] overflow-hidden bg-[#111]">
        <img
          src={movieImage}
          alt={movieName}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-95" />

        <div className="absolute left-3 top-3 flex flex-col gap-2">
          <span className="w-fit rounded-md bg-[#f5c518] px-2 py-1 text-[11px] font-black text-black">
            2D
          </span>

          <span className="w-fit rounded-md bg-[#e50914] px-2 py-1 text-[11px] font-black text-white">
            {ageLabel}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-[#f5c518]">
            <Star
              size={15}
              fill="currentColor"
            />

            <span className="text-sm font-black text-white">
              {movieRating}
            </span>
          </div>

          <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-bold text-zinc-400">
            {movieStatus}
          </span>
        </div>

        <h3 className="line-clamp-2 min-h-[48px] text-base font-black leading-6 text-white">
          {movieName}
        </h3>

        <div className="mt-3 flex items-center gap-2 text-sm text-zinc-400">
          <CalendarDays size={15} />
          <span>{movieDate}</span>
        </div>

        <button
          type="button"
          onClick={handleGoToDetail}
          className="mt-4 flex h-9 w-full items-center justify-center gap-2 rounded-full bg-white/[0.07] text-sm font-bold text-[#60a5fa] transition hover:bg-white/10 hover:text-[#93c5fd]"
        >
          <Ticket size={16} />
          Mua vé ngay
        </button>

        <div className="mt-4 grid grid-cols-2 gap-2 text-sm font-bold">
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl py-2 text-white transition hover:bg-white/10"
          >
            <Play
              size={15}
              fill="currentColor"
            />
            Trailer
          </button>

          <Link
            to={`/detail/${movieId}`}
            className="flex items-center justify-center gap-2 rounded-xl py-2 text-white transition hover:bg-white/10"
          >
            <Info size={15} />
            Chi tiết
          </Link>
        </div>
      </div>
    </article>
  );
};

export default MovieCard;