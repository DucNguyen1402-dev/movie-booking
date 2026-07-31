import { useEffect, useMemo, useState } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";

import MovieCard from "./MovieCard";

const MOVIES_PER_SLIDE = 4;

const chunkMovies = (movies = [], size = MOVIES_PER_SLIDE) => {
  const result = [];

  for (let index = 0; index < movies.length; index += size) {
    result.push(movies.slice(index, index + size));
  }

  return result;
};

export default function MovieSection({ title, movies = [] }) {
  const [activePage, setActivePage] = useState(0);

  const moviePages = useMemo(() => {
    return chunkMovies(movies, MOVIES_PER_SLIDE);
  }, [movies]);

  const totalPages = moviePages.length;
  const currentMovies = moviePages[activePage] || [];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActivePage(0);
  }, [movies.length]);

  useEffect(() => {
    if (activePage > totalPages - 1) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActivePage(0);
    }
  }, [activePage, totalPages]);

  const handlePrev = () => {
    setActivePage((current) => {
      if (current === 0) return totalPages - 1;
      return current - 1;
    });
  };

  const handleNext = () => {
    setActivePage((current) => {
      if (current === totalPages - 1) return 0;
      return current + 1;
    });
  };

  if (!movies.length) return null;

  return (
    <section className="cine-section">
      <div className="cine-container">
        <div className="mb-12 flex items-center justify-between gap-4">
          <h2 className="cine-title mb-0">{title}</h2>

          {totalPages > 1 && (
            <div className="hidden items-center gap-3 md:flex">
              <button
                type="button"
                onClick={handlePrev}
                className="grid h-11 w-11 place-items-center rounded-xl border border-white/20 bg-white/5 text-white transition hover:border-[#ffeb00] hover:text-[#ffeb00]"
                aria-label="Trang phim trước"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="grid h-11 w-11 place-items-center rounded-xl border border-white/20 bg-white/5 text-white transition hover:border-[#ffeb00] hover:text-[#ffeb00]"
                aria-label="Trang phim tiếp theo"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </div>

        <div className="relative overflow-hidden">
          <div
            key={activePage}
            className="grid grid-cols-2 gap-x-5 gap-y-10 transition duration-300 md:grid-cols-3 lg:grid-cols-4"
          >
            {currentMovies.map((movie) => (
              <MovieCard key={movie.maPhim} movie={movie} />
            ))}
          </div>

          {totalPages > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute top-[38%] left-0 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-xl bg-black/60 text-white backdrop-blur transition hover:bg-[#ffeb00] hover:text-black md:hidden"
                aria-label="Trang phim trước"
              >
                <ChevronLeft size={26} />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="absolute top-[38%] right-0 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-xl bg-black/60 text-white backdrop-blur transition hover:bg-[#ffeb00] hover:text-black md:hidden"
                aria-label="Trang phim tiếp theo"
              >
                <ChevronRight size={26} />
              </button>
            </>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-3">
            {moviePages.map((page, index) => (
              <button
                key={page[0]?.maPhim || index}
                type="button"
                onClick={() => setActivePage(index)}
                className={`h-2.5 rounded-full transition ${
                  activePage === index
                    ? "w-10 bg-[#ffeb00]"
                    : "w-2.5 bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Chuyển đến trang ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
