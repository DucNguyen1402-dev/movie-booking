import {
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  Star,
  Ticket,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMovieList } from "@/hooks/customer/useMovies";

const AUTO_SLIDE_TIME = 5000;

const getSlideMovies = (movies = []) => {
  return [...movies]
    .sort((a, b) => {
      const hotScoreA = a.hot ? 1 : 0;
      const hotScoreB = b.hot ? 1 : 0;

      if (hotScoreA !== hotScoreB) {
        return hotScoreB - hotScoreA;
      }

      return (b.danhGia || 0) - (a.danhGia || 0);
    })
    .slice(0, 6);
};

const HeroBannerSkeleton = () => {
  return (
    <section className="bg-[#070b1a]">
      <div className="cine-container grid min-h-[620px] items-center gap-10 py-12 lg:grid-cols-[1fr_460px]">
        <div>
          <div className="h-9 w-64 animate-pulse rounded-full bg-white/10" />
          <div className="mt-7 h-20 w-full max-w-2xl animate-pulse rounded-2xl bg-white/10" />
          <div className="mt-4 h-20 w-full max-w-xl animate-pulse rounded-2xl bg-white/10" />
          <div className="mt-8 h-14 w-80 animate-pulse rounded-xl bg-white/10" />
        </div>

        <div className="h-[520px] animate-pulse rounded-[28px] bg-white/10" />
      </div>
    </section>
  );
};

const HeroBanner = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const { data: movies = [], isLoading } = useMovieList("GP01");

  const slideMovies = useMemo(() => getSlideMovies(movies), [movies]);

  const activeMovie = slideMovies[activeIndex];

  useEffect(() => {
    if (slideMovies.length <= 1) return undefined;

    const timer = setInterval(() => {
      setActiveIndex((current) => {
        if (current === slideMovies.length - 1) return 0;
        return current + 1;
      });
    }, AUTO_SLIDE_TIME);

    return () => clearInterval(timer);
  }, [slideMovies.length]);

  useEffect(() => {
    if (activeIndex > slideMovies.length - 1) {
      setActiveIndex(0);
    }
  }, [activeIndex, slideMovies.length]);

  const handlePrev = () => {
    setActiveIndex((current) => {
      if (current === 0) return slideMovies.length - 1;
      return current - 1;
    });
  };

  const handleNext = () => {
    setActiveIndex((current) => {
      if (current === slideMovies.length - 1) return 0;
      return current + 1;
    });
  };

  const handleGoToDetail = () => {
    if (!activeMovie?.maPhim) return;
    navigate(`/detail/${activeMovie.maPhim}`);
  };

  const handleWatchTrailer = () => {
    if (activeMovie?.trailer) {
      window.open(activeMovie.trailer, "_blank", "noopener,noreferrer");
      return;
    }

    handleGoToDetail();
  };

  if (isLoading) {
    return <HeroBannerSkeleton />;
  }

  if (!activeMovie) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-[#070b1a] text-white">
      <div className="absolute inset-0">
        <img
          src={activeMovie.hinhAnh}
          alt={activeMovie.tenPhim}
          className="h-full w-full scale-110 object-cover opacity-25 blur-xl"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#070b1a] via-[#111238]/90 to-[#070b1a]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_42%,rgba(245,197,24,0.16),transparent_34%)]" />
      </div>

      <div className="cine-container relative grid min-h-[640px] items-center gap-10 py-14 lg:grid-cols-[minmax(0,1fr)_520px]">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-black text-[#f5c518] backdrop-blur">
            <Star size={16} fill="currentColor" />
            Trải nghiệm đặt vé phim trực tuyến
          </div>

          <h1 className="mt-7 text-5xl font-black uppercase leading-[0.98] tracking-[-0.05em] text-white md:text-7xl">
            Đặt vé nhanh, chọn ghế đẹp, xem phim cực đã
          </h1>

          <p className="mt-7 max-w-2xl text-lg font-semibold leading-8 text-zinc-300">
            Cập nhật phim mới nhất, chọn rạp gần bạn và đặt vé chỉ trong vài
            bước đơn giản.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={handleGoToDetail}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-[#f5c518] px-7 text-sm font-black uppercase text-black shadow-[0_6px_0_#a17f05] transition hover:bg-[#ffe45c]"
            >
              <Ticket size={18} />
              Đặt vé ngay
            </button>

            <button
              type="button"
              onClick={handleWatchTrailer}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-xl border border-[#f5c518] px-7 text-sm font-black text-white transition hover:bg-[#f5c518] hover:text-black"
            >
              <PlayCircle size={20} />
              Xem trailer
            </button>
          </div>

          <div className="mt-10 flex items-center gap-3">
            {slideMovies.map((movie, index) => (
              <button
                key={movie.maPhim}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition ${
                  activeIndex === index
                    ? "w-10 bg-[#f5c518]"
                    : "w-2.5 bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Chuyển đến phim ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[470px]">
          <button
            type="button"
            onClick={handlePrev}
            className="absolute -left-16 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-xl border border-white/30 bg-black/40 text-white backdrop-blur transition hover:border-[#f5c518] hover:text-[#f5c518] xl:grid"
            aria-label="Phim trước"
          >
            <ChevronLeft size={30} />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="absolute -right-16 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-xl border border-white/30 bg-black/40 text-white backdrop-blur transition hover:border-[#f5c518] hover:text-[#f5c518] xl:grid"
            aria-label="Phim tiếp theo"
          >
            <ChevronRight size={30} />
          </button>

          <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-white/10 shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
            <img
              key={activeMovie.maPhim}
              src={activeMovie.hinhAnh}
              alt={activeMovie.tenPhim}
              className="h-[520px] w-full object-cover transition duration-500"
            />

            <div className="absolute left-5 top-5 flex items-center gap-2">
              <span className="rounded-md bg-[#f5c518] px-2.5 py-1 text-xs font-black text-black">
                2D
              </span>

              <span className="rounded-md bg-[#e50914] px-2.5 py-1 text-xs font-black text-white">
                T{activeMovie.danhGia >= 8 ? "18" : "13"}
              </span>
            </div>

            <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/10 bg-black/55 p-5 backdrop-blur-xl">
              <p className="text-sm font-black text-[#f5c518]">Phim nổi bật</p>

              <h2 className="mt-2 line-clamp-2 text-2xl font-black uppercase text-white">
                {activeMovie.tenPhim}
              </h2>

              <div className="mt-3 flex items-center gap-3 text-sm font-bold text-zinc-300">
                <span className="inline-flex items-center gap-1 text-[#f5c518]">
                  <Star size={16} fill="currentColor" />
                  {activeMovie.danhGia || 0}
                </span>

                <span>
                  {activeMovie.hot
                    ? "Phim hot"
                    : activeMovie.dangChieu
                      ? "Đang chiếu"
                      : "Sắp chiếu"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 flex justify-center gap-3 xl:hidden">
            <button
              type="button"
              onClick={handlePrev}
              className="grid h-11 w-11 place-items-center rounded-xl border border-white/20 bg-white/10 text-white"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="grid h-11 w-11 place-items-center rounded-xl border border-white/20 bg-white/10 text-white"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;