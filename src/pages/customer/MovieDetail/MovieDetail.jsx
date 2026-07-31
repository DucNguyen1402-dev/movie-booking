import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  CalendarDays,
  ChevronRight,
  Clock3,
  Flame,
  MapPin,
  Play,
  Star,
  Ticket,
} from "lucide-react";

import { useMovieShowtime } from "@/hooks/customer/useCinema";
import {
  formatCurrency,
  formatDate,
  formatTime,
  getYoutubeEmbedUrl,
} from "@/utils/customer/format";

const DetailSkeleton = () => {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="cine-container py-10">
        <div className="h-[520px] animate-pulse rounded-3xl bg-[#1f1f1f]" />

        <div className="mt-8 grid gap-5 lg:grid-cols-[280px_1fr]">
          <div className="h-[420px] animate-pulse rounded-2xl bg-[#1f1f1f]" />
          <div className="h-[420px] animate-pulse rounded-2xl bg-[#1f1f1f]" />
        </div>
      </div>
    </main>
  );
};

const getFirstShowtime = (cinemaSystems = []) => {
  for (const system of cinemaSystems) {
    for (const cluster of system.cumRapChieu || []) {
      if (cluster.lichChieuPhim?.length) {
        return cluster.lichChieuPhim[0];
      }
    }
  }

  return null;
};

const MovieDetail = () => {
  const { maPhim } = useParams();
  const navigate = useNavigate();

  const [activeSystem, setActiveSystem] = useState("");
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const { data: movieDetail, isLoading, error } = useMovieShowtime(maPhim);

  const cinemaSystems = useMemo(
    () => movieDetail?.heThongRapChieu || [],
    [movieDetail?.heThongRapChieu],
  );

  const selectedSystemCode =
    activeSystem || cinemaSystems[0]?.maHeThongRap || "";

  const trailerEmbedUrl = getYoutubeEmbedUrl(movieDetail?.trailer);

  const firstShowtime = useMemo(() => {
    return getFirstShowtime(cinemaSystems);
  }, [cinemaSystems]);

  const activeCinemaSystem = useMemo(() => {
    return (
      cinemaSystems.find(
        (system) => system.maHeThongRap === selectedSystemCode,
      ) || cinemaSystems[0]
    );
  }, [cinemaSystems, selectedSystemCode]);

  const handleBooking = (maLichChieu) => {
    navigate(`/ticketroom/${maLichChieu}`);
  };

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (error || !movieDetail) {
    return (
      <main className="min-h-screen bg-black text-white">
        <div className="cine-container py-20">
          <div className="rounded-3xl border border-white/10 bg-[#151515] p-10 text-center">
            <p className="text-2xl font-black">Không tải được thông tin phim</p>

            <p className="mt-3 text-zinc-400">
              Bạn thử quay lại danh sách phim và chọn phim khác nhé.
            </p>

            <Link
              to="/movies"
              className="mt-6 inline-flex rounded-full bg-[#f5c518] px-6 py-3 text-sm font-black text-black"
            >
              Quay lại thư viện phim
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-black text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <img
            src={movieDetail.hinhAnh}
            alt={movieDetail.tenPhim}
            className="h-full w-full object-cover opacity-25 blur-xl"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/85 to-black" />
        </div>

        <div className="cine-container relative py-10 md:py-14">
          <Link
            to="/movies"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-[#f5c518] hover:text-[#f5c518]"
          >
            <ArrowLeft size={17} />
            Quay lại thư viện phim
          </Link>

          <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
            <div className="relative">
              <img
                src={movieDetail.hinhAnh}
                alt={movieDetail.tenPhim}
                className="aspect-[2/3] w-full rounded-3xl object-cover shadow-[0_24px_80px_rgba(0,0,0,0.65)] ring-1 ring-white/15"
              />

              <div className="absolute top-4 left-4 flex gap-2">
                <span className="rounded bg-[#f5c518] px-2.5 py-1 text-xs font-black text-black">
                  2D
                </span>

                <span className="rounded bg-[#e50914] px-2.5 py-1 text-xs font-black text-white">
                  T{movieDetail.danhGia >= 8 ? "18" : "13"}
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-end pb-2">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                {movieDetail.hot && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#e50914] px-4 py-2 text-xs font-black uppercase">
                    <Flame size={15} />
                    Phim hot
                  </span>
                )}

                {movieDetail.dangChieu && (
                  <span className="rounded-full border border-[#f5c518] px-4 py-2 text-xs font-black text-[#f5c518] uppercase">
                    Đang chiếu
                  </span>
                )}

                {movieDetail.sapChieu && (
                  <span className="rounded-full border border-white/20 px-4 py-2 text-xs font-black text-white uppercase">
                    Sắp chiếu
                  </span>
                )}
              </div>

              <h1 className="max-w-4xl text-4xl leading-tight font-black tracking-tight text-white md:text-6xl">
                {movieDetail.tenPhim}
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-300 md:text-lg">
                {movieDetail.moTa || "Thông tin mô tả phim đang được cập nhật."}
              </p>

              <div className="mt-7 flex flex-wrap gap-5 text-sm font-bold text-zinc-300">
                <div className="flex items-center gap-2">
                  <Star size={18} fill="#f5c518" className="text-[#f5c518]" />
                  <span>{movieDetail.danhGia}/10</span>
                </div>

                <div className="flex items-center gap-2">
                  <CalendarDays size={18} className="text-[#f5c518]" />
                  <span>
                    Khởi chiếu: {formatDate(movieDetail.ngayKhoiChieu)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock3 size={18} className="text-[#f5c518]" />
                  <span>{firstShowtime?.thoiLuong || 120} phút</span>
                </div>
              </div>

              <div className="mt-9 flex flex-wrap gap-4">
                {firstShowtime ? (
                  <button
                    onClick={() => handleBooking(firstShowtime.maLichChieu)}
                    className="inline-flex h-12 items-center justify-center rounded-md bg-[#f5c518] px-7 text-sm font-black text-black uppercase shadow-[0_7px_0_#9f7f08] transition hover:-translate-y-0.5 hover:bg-[#ffd84d]"
                  >
                    <Ticket size={18} />
                    <span className="ml-2">Đặt vé ngay</span>
                  </button>
                ) : (
                  <button
                    disabled
                    className="inline-flex h-12 cursor-not-allowed items-center justify-center rounded-md bg-zinc-700 px-7 text-sm font-black text-zinc-400 uppercase"
                  >
                    Chưa có lịch chiếu
                  </button>
                )}

                <button
                  onClick={() => setIsTrailerOpen(true)}
                  disabled={!trailerEmbedUrl}
                  className={`inline-flex h-12 items-center justify-center rounded-md border px-7 text-sm font-black uppercase transition ${
                    trailerEmbedUrl
                      ? "border-white/25 text-white hover:border-[#f5c518] hover:text-[#f5c518]"
                      : "cursor-not-allowed border-white/10 text-zinc-600"
                  }`}
                >
                  <Play size={18} />
                  <span className="ml-2">Xem trailer</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="showtimes" className="cine-container py-12 md:py-16">
        <div className="mb-7 flex items-center gap-3">
          <span className="h-8 w-1 rounded-full bg-[#f5c518]" />

          <h2 className="text-2xl font-black text-white md:text-3xl">
            Lịch chiếu phim
          </h2>

          <ChevronRight size={25} />
        </div>

        {!cinemaSystems.length && (
          <div className="rounded-3xl border border-white/10 bg-[#171717] p-10 text-center">
            <p className="text-lg font-bold">Phim này chưa có lịch chiếu.</p>

            <p className="mt-2 text-sm text-zinc-400">
              Bạn có thể quay lại sau hoặc chọn phim khác trong thư viện.
            </p>
          </div>
        )}

        {!!cinemaSystems.length && (
          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            <aside className="h-fit rounded-3xl border border-white/10 bg-[#151515] p-3">
              {cinemaSystems.map((system) => (
                <button
                  key={system.maHeThongRap}
                  onClick={() => setActiveSystem(system.maHeThongRap)}
                  className={`flex w-full items-center gap-4 rounded-2xl p-4 text-left transition ${
                    selectedSystemCode === system.maHeThongRap
                      ? "bg-[#f5c518] text-black"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  <img
                    src={system.logo}
                    alt={system.tenHeThongRap}
                    className="h-11 w-11 rounded-full bg-white object-contain p-1"
                  />

                  <div>
                    <p className="font-black">{system.tenHeThongRap}</p>

                    <p
                      className={`mt-1 text-xs font-medium ${
                        selectedSystemCode === system.maHeThongRap
                          ? "text-black/70"
                          : "text-zinc-400"
                      }`}
                    >
                      {system.cumRapChieu?.length || 0} cụm rạp
                    </p>
                  </div>
                </button>
              ))}
            </aside>

            <div className="space-y-5">
              {activeCinemaSystem?.cumRapChieu?.map((cluster) => (
                <article
                  key={cluster.maCumRap}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-[#151515]"
                >
                  <div className="grid gap-4 border-b border-white/10 p-5 md:grid-cols-[88px_1fr]">
                    <img
                      src={activeCinemaSystem.logo}
                      alt={`${activeCinemaSystem.tenHeThongRap} - ${cluster.tenCumRap}`}
                      className="h-20 w-20 rounded-2xl bg-white object-contain p-2"
                    />

                    <div>
                      <h3 className="text-lg font-black text-white">
                        {cluster.tenCumRap}
                      </h3>

                      <p className="mt-2 flex items-start gap-2 text-sm leading-6 text-zinc-400">
                        <MapPin
                          size={17}
                          className="mt-0.5 shrink-0 text-[#f5c518]"
                        />
                        {cluster.diaChi}
                      </p>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="mb-4 text-sm font-black tracking-[0.16em] text-[#f5c518] uppercase">
                      Chọn suất chiếu
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {cluster.lichChieuPhim?.map((showtime) => (
                        <button
                          key={showtime.maLichChieu}
                          onClick={() => handleBooking(showtime.maLichChieu)}
                          className="group rounded-xl border border-white/10 bg-[#222] px-4 py-3 text-left transition hover:-translate-y-0.5 hover:border-[#f5c518] hover:bg-[#f5c518] hover:text-black"
                        >
                          <p className="text-base font-black">
                            {formatTime(showtime.ngayChieuGioChieu)}
                          </p>

                          <p className="mt-1 text-xs font-medium text-zinc-400 group-hover:text-black/70">
                            {formatDate(showtime.ngayChieuGioChieu)}
                          </p>

                          <p className="mt-2 text-xs font-bold text-[#f5c518] group-hover:text-black">
                            {formatCurrency(showtime.giaVe)}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>

      {isTrailerOpen && trailerEmbedUrl && (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-black/85 p-4 backdrop-blur">
          <div className="w-full max-w-4xl overflow-hidden rounded-3xl bg-[#111] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <p className="font-black">{movieDetail.tenPhim}</p>

              <button
                onClick={() => setIsTrailerOpen(false)}
                className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold transition hover:bg-white/20"
              >
                Đóng
              </button>
            </div>

            <div className="aspect-video">
              <iframe
                src={trailerEmbedUrl}
                title={movieDetail.tenPhim}
                className="h-full w-full"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default MovieDetail;