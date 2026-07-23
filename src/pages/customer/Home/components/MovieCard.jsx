import { Link } from "react-router-dom";

import { PlayCircle, Ticket } from "lucide-react";

export default function MovieCard({ movie }) {
  return (
    <article className="group">
      <Link to={`/detail/${movie.maPhim}`} className="block">
        <div className="relative overflow-hidden rounded-lg border border-white/15 bg-white/5">
          <img
            src={movie.hinhAnh}
            alt={movie.tenPhim}
            className="movie-poster"
          />

          <div className="absolute left-3 top-3 flex gap-2">
            <span className="rounded-sm bg-[#ffb020] px-2 py-1 text-xs font-black text-black">
              2D
            </span>
            <span className="rounded-sm bg-[#ff0055] px-2 py-1 text-xs font-black text-white">
              T{movie.danhGia >= 8 ? "18" : "13"}
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black via-black/80 to-transparent p-4 transition duration-300 group-hover:translate-y-0">
            <p className="line-clamp-2 text-sm font-bold text-white/90">
              {movie.moTa || "Thông tin phim đang được cập nhật."}
            </p>
          </div>
        </div>

        <h3 className="mt-4 min-h-[48px] text-center text-base font-extrabold uppercase leading-snug text-white transition group-hover:text-[#ffeb00]">
          {movie.tenPhim}
        </h3>
      </Link>

      <div className="mt-4 grid grid-cols-[1fr_1.5fr] gap-3">
        <button className="flex items-center justify-center gap-2 rounded-md text-sm font-bold text-white underline decoration-white/30 underline-offset-4 hover:text-[#ffeb00]">
          <PlayCircle size={17} />
          Trailer
        </button>

        <Link
          to={`/detail/${movie.maPhim}`}
          className="cine-btn-yellow h-11 px-4 py-0"
        >
          <Ticket size={17} />
          <span className="ml-2">Đặt vé</span>
        </Link>
      </div>
    </article>
  );
}