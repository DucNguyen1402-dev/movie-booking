import { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

import { CalendarDays, Info, Play, Star, Ticket, X } from "lucide-react";

import { getYoutubeEmbedUrl } from "@/utils/customer/format";

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

const ModalShell = ({ title, onClose, children, maxWidth = "max-w-4xl" }) => {
  return createPortal(
    <div
      className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-black/85 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
        className={`my-auto w-full ${maxWidth} overflow-hidden rounded-3xl border border-white/15 bg-[#151515] text-white shadow-[0_35px_120px_rgba(0,0,0,0.7)]`}
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
          <h2 className="line-clamp-1 text-lg font-black">{title}</h2>

          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-white transition hover:bg-[#f5c518] hover:text-black"
            aria-label="Đóng cửa sổ"
          >
            <X size={20} />
          </button>
        </div>

        {children}
      </section>
    </div>,
    document.body,
  );
};

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState("");

  if (!movie) return null;

  const movieId = movie.maPhim;
  const movieName = movie.tenPhim || "Đang cập nhật";
  const movieImage = movie.hinhAnh;
  const movieRating = movie.danhGia || 0;
  const movieDate = formatMovieDate(movie.ngayKhoiChieu);
  const ageLabel = getMovieAgeLabel(movie);
  const movieStatus = getMovieStatus(movie);
  const trailerEmbedUrl = getYoutubeEmbedUrl(movie.trailer);

  const handleGoToBooking = () => {
    navigate(`/detail/${movieId}`);
  };

  return (
    <>
      <article className="group w-[210px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#1b1b1b] shadow-[0_16px_50px_rgba(0,0,0,0.38)] transition duration-300 hover:-translate-y-1 hover:border-[#f5c518]/60">
        <div className="relative h-[315px] overflow-hidden bg-[#111]">
          <img
            src={movieImage}
            alt={movieName}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-95" />

          <div className="absolute top-3 left-3 flex flex-col gap-2">
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
              <Star size={15} fill="currentColor" />

              <span className="text-sm font-black text-white">
                {movieRating}
              </span>
            </div>

            <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-bold text-zinc-400">
              {movieStatus}
            </span>
          </div>

          <h3 className="line-clamp-2 min-h-[48px] text-base leading-6 font-black text-white">
            {movieName}
          </h3>

          <div className="mt-3 flex items-center gap-2 text-sm text-zinc-400">
            <CalendarDays size={15} />
            <span>{movieDate}</span>
          </div>

          <button
            type="button"
            onClick={handleGoToBooking}
            className="mt-4 flex h-9 w-full items-center justify-center gap-2 rounded-full bg-white/[0.07] text-sm font-bold text-[#60a5fa] transition hover:bg-white/10 hover:text-[#93c5fd]"
          >
            <Ticket size={16} />
            Mua vé ngay
          </button>

          <div className="mt-4 grid grid-cols-2 gap-2 text-sm font-bold">
            <button
              type="button"
              onClick={() => setActiveModal("trailer")}
              disabled={!trailerEmbedUrl}
              className="flex items-center justify-center gap-2 rounded-xl py-2 text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:text-zinc-600 disabled:hover:bg-transparent"
              title={
                trailerEmbedUrl ? "Xem trailer" : "Trailer chưa được cập nhật"
              }
            >
              <Play size={15} fill="currentColor" />
              Trailer
            </button>

            <button
              type="button"
              onClick={() => setActiveModal("detail")}
              className="flex items-center justify-center gap-2 rounded-xl py-2 text-white transition hover:bg-white/10"
            >
              <Info size={15} />
              Chi tiết
            </button>
          </div>
        </div>
      </article>

      {activeModal === "trailer" && trailerEmbedUrl && (
        <ModalShell
          title={`Trailer - ${movieName}`}
          onClose={() => setActiveModal("")}
        >
          <div className="aspect-video bg-black">
            <iframe
              src={`${trailerEmbedUrl}?autoplay=1`}
              title={`Trailer ${movieName}`}
              className="h-full w-full"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </ModalShell>
      )}

      {activeModal === "detail" && (
        <ModalShell
          title={`Chi tiết - ${movieName}`}
          onClose={() => setActiveModal("")}
          maxWidth="max-w-3xl"
        >
          <div className="grid gap-6 p-5 md:grid-cols-[210px_1fr] md:p-7">
            <img
              src={movieImage}
              alt={movieName}
              className="mx-auto aspect-[2/3] w-full max-w-[210px] rounded-2xl object-cover shadow-2xl"
            />

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-[#f5c518] px-2.5 py-1 text-xs font-black text-black">
                  2D
                </span>

                <span className="rounded-md bg-[#e50914] px-2.5 py-1 text-xs font-black text-white">
                  {ageLabel}
                </span>

                <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-bold text-zinc-300">
                  {movieStatus}
                </span>
              </div>

              <h3 className="mt-4 text-3xl leading-tight font-black text-white">
                {movieName}
              </h3>

              <div className="mt-4 flex flex-wrap gap-4 text-sm font-bold text-zinc-400">
                <span className="inline-flex items-center gap-1.5">
                  <Star size={16} fill="#f5c518" className="text-[#f5c518]" />
                  {movieRating}/10
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays size={16} className="text-[#f5c518]" />
                  {movieDate}
                </span>
              </div>

              <div className="mt-5 border-t border-white/10 pt-5">
                <p className="text-xs font-black tracking-[0.18em] text-[#f5c518] uppercase">
                  Nội dung phim
                </p>

                <p className="mt-3 max-h-56 overflow-y-auto pr-2 text-sm leading-7 text-zinc-300">
                  {movie.moTa || "Thông tin mô tả phim đang được cập nhật."}
                </p>
              </div>
            </div>
          </div>
        </ModalShell>
      )}
    </>
  );
};

export default MovieCard;