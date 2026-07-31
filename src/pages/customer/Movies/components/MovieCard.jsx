import { Link, useNavigate } from "react-router-dom";

import {
  CalendarDays,
  Heart,
  Info,
  Play,
  Plus,
  Star,
  Ticket,
} from "lucide-react";

const getMovieAgeLabel = (movie) => {
  if (movie?.danhGia >= 8) return "T18";
  if (movie?.danhGia >= 6) return "T16";
  return "T13";
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

export default function MovieCard({ movie, variant = "default" }) {
  const navigate = useNavigate();

  if (!movie) return null;

  const movieId = movie.maPhim;
  const movieName = movie.tenPhim || "Đang cập nhật";
  const movieImage = movie.hinhAnh;
  const movieRating = movie.danhGia || 0;
  const ageLabel = getMovieAgeLabel(movie);
  const releaseDate = formatMovieDate(movie.ngayKhoiChieu);

  const handleBooking = () => {
    navigate(`/detail/${movieId}`);
  };

  const isLarge = variant === "large";

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl bg-[#1b1b1b] ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:ring-[#f5c518]/70 ${
        isLarge ? "min-w-[420px]" : "min-w-[210px]"
      }`}
    >
      <div
        className={`relative overflow-hidden bg-[#111] ${
          isLarge ? "h-[420px]" : "h-[310px]"
        }`}
      >
        <img
          src={movieImage}
          alt={movieName}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-90" />

        <button
          type="button"
          className="absolute left-3 top-3 grid h-10 w-10 place-items-center rounded-br-xl bg-black/65 text-white backdrop-blur transition hover:bg-[#f5c518] hover:text-black"
          title="Thêm vào danh sách"
        >
          <Plus size={20} />
        </button>

        <div className="absolute left-3 top-16 flex flex-col gap-2">
          <span className="w-fit rounded-md bg-[#f5c518] px-2 py-1 text-[11px] font-black text-black">
            2D
          </span>

          <span className="w-fit rounded-md bg-[#e50914] px-2 py-1 text-[11px] font-black text-white">
            {ageLabel}
          </span>
        </div>

        <button
          type="button"
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-black/55 text-white backdrop-blur transition hover:bg-white hover:text-black"
          title="Yêu thích"
        >
          <Heart size={18} />
        </button>

        <div className="absolute inset-x-0 bottom-0 translate-y-4 p-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={handleBooking}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#f5c518] text-sm font-black uppercase text-black shadow-[0_5px_0_#9b7b08] transition hover:bg-[#ffe06a]"
          >
            <Ticket size={17} />
            Mua vé ngay
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-[#f5c518]">
            <Star size={16} fill="currentColor" />
            <span className="text-sm font-black text-white">
              {movieRating}
            </span>
          </div>

          <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-bold text-zinc-400">
            {movie.hot
              ? "Phim hot"
              : movie.dangChieu
                ? "Đang chiếu"
                : "Sắp chiếu"}
          </span>
        </div>

        <h3 className="line-clamp-2 min-h-[48px] text-base font-black leading-6 text-white">
          {movieName}
        </h3>

        <div className="mt-3 flex items-center gap-2 text-sm text-zinc-400">
          <CalendarDays size={15} />
          <span>{releaseDate}</span>
        </div>

        <div className="mt-4 rounded-full bg-white/[0.06] p-1">
          <button
            type="button"
            onClick={handleBooking}
            className="flex h-9 w-full items-center justify-center gap-2 rounded-full text-sm font-bold text-[#4ea3ff] transition hover:bg-white/10"
          >
            <Plus size={16} />
            Đặt vé
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-sm font-bold">
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl py-2 text-white transition hover:bg-white/10"
          >
            <Play size={15} fill="currentColor" />
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
}