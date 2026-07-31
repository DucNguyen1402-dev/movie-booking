import { useMemo, useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Flame,
  Search,
  SlidersHorizontal,
  Sparkles,
  Ticket,
} from "lucide-react";

import MovieCard from "@/components/customer/MovieCard";
import MovieCardSkeleton from "@/components/customer/MovieCardSkeleton";
import { useMovieList } from "@/hooks/customer/useMovies";

const DEFAULT_PAGE_SIZE = 10;
const MOVIES_PER_ROW = 5;
const pageSizeOptions = [8, 10, 12, 16];

const filterList = [
  { label: "Tất cả", value: "all" },
  { label: "Đang chiếu", value: "dangChieu" },
  { label: "Phim hot", value: "hot" },
];

const sortList = [
  { label: "Mặc định", value: "default" },
  { label: "Đánh giá cao", value: "rating" },
  { label: "Tên A-Z", value: "name" },
  { label: "Mới nhất", value: "date" },
];

const normalizeText = (value = "") => {
  return value
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
};

const getFilteredMovies = ({ movies, keyword, activeFilter, sortType }) => {
  const searchText = normalizeText(keyword);

  const result = movies.filter((movie) => {
    const movieName = normalizeText(movie.tenPhim);
    const matchKeyword = !searchText || movieName.includes(searchText);

    if (!matchKeyword) return false;
    if (activeFilter === "all") return true;

    return Boolean(movie[activeFilter]);
  });

  if (sortType === "rating") {
    return [...result].sort((a, b) => (b.danhGia || 0) - (a.danhGia || 0));
  }

  if (sortType === "name") {
    return [...result].sort((a, b) =>
      (a.tenPhim || "").localeCompare(b.tenPhim || ""),
    );
  }

  if (sortType === "date") {
    return [...result].sort(
      (a, b) =>
        new Date(b.ngayKhoiChieu || 0) - new Date(a.ngayKhoiChieu || 0),
    );
  }

  return result;
};

const getCategoryMovies = (movies = []) => {
  const usedMovieIds = new Set();

  const takeUniqueMovies = (movieList) => {
    const result = [];

    for (const movie of movieList) {
      if (usedMovieIds.has(movie.maPhim)) continue;

      usedMovieIds.add(movie.maPhim);
      result.push(movie);

      if (result.length === 10) break;
    }

    return result;
  };

  const hotCandidates = movies.filter((movie) => movie.hot);
  const sortedByRating = [...movies].sort(
    (a, b) => (b.danhGia || 0) - (a.danhGia || 0),
  );

  const hotMovies = takeUniqueMovies(
    hotCandidates.length ? hotCandidates : sortedByRating,
  );

  const showingMovies = takeUniqueMovies(
    movies.filter((movie) => movie.dangChieu),
  );

  return {
    hotMovies,
    showingMovies,
  };
};

const getPaginationRange = (currentPage, totalPages) => {
  const maxVisiblePages = 5;

  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, 5];
  }

  if (currentPage >= totalPages - 2) {
    return Array.from({ length: 5 }, (_, index) => totalPages - 4 + index);
  }

  return Array.from({ length: 5 }, (_, index) => currentPage - 2 + index);
};

const SectionHeading = ({ title, subtitle, icon: Icon }) => {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <div className="flex items-center gap-3">
          <span className="h-8 w-1 rounded-full bg-[#f5c518]" />

          {Icon && <Icon size={22} className="text-[#f5c518]" />}

          <h2 className="text-2xl font-black tracking-[-0.03em] text-white md:text-3xl">
            {title}
          </h2>

          <ChevronRight size={23} className="text-zinc-400" />
        </div>

        {subtitle && (
          <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-zinc-400 md:text-base">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

const MovieRow = ({ title, subtitle, movies = [], icon: Icon, isLoading }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isLoading && movies.length === 0) return null;

  const totalSlides = Math.max(1, Math.ceil(movies.length / MOVIES_PER_ROW));
  const activeSlide = Math.min(currentSlide, totalSlides - 1);
  const startIndex = activeSlide * MOVIES_PER_ROW;
  const visibleMovies = movies.slice(
    startIndex,
    startIndex + MOVIES_PER_ROW,
  );

  const handlePreviousSlide = () => {
    setCurrentSlide((current) =>
      current === 0 ? totalSlides - 1 : current - 1,
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((current) =>
      current === totalSlides - 1 ? 0 : current + 1,
    );
  };

  return (
    <section className="mt-14">
      <SectionHeading title={title} subtitle={subtitle} icon={Icon} />

      <div className="relative">
        {totalSlides > 1 && !isLoading && (
          <>
            <button
              type="button"
              onClick={handlePreviousSlide}
              className="absolute -left-6 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/80 text-white transition hover:border-[#f5c518] hover:bg-[#f5c518] hover:text-black lg:grid"
              aria-label={`${title} trước`}
            >
              <ChevronLeft size={28} />
            </button>

            <button
              type="button"
              onClick={handleNextSlide}
              className="absolute -right-6 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/80 text-white transition hover:border-[#f5c518] hover:bg-[#f5c518] hover:text-black lg:grid"
              aria-label={`${title} tiếp theo`}
            >
              <ChevronRight size={28} />
            </button>
          </>
        )}

        <div className="flex gap-5 overflow-x-auto pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {isLoading
            ? Array.from({ length: MOVIES_PER_ROW }).map((_, index) => (
                <MovieCardSkeleton key={index} />
              ))
            : visibleMovies.map((movie) => (
                <MovieCard key={movie.maPhim} movie={movie} />
              ))}
        </div>
      </div>

      {totalSlides > 1 && !isLoading && (
        <div className="mt-3 flex justify-center gap-3">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 rounded-full transition-all ${
                activeSlide === index
                  ? "w-10 bg-[#f5c518]"
                  : "w-2.5 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Chuyển đến trang ${index + 1} của ${title}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

const Pagination = ({ currentPage, totalPages, onChange }) => {
  if (totalPages <= 1) return null;

  const pageRange = getPaginationRange(currentPage, totalPages);

  return (
    <div className="mt-9 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-10 rounded-xl border border-white/10 bg-white/[0.06] px-4 text-sm font-black text-white transition hover:border-[#f5c518] hover:text-[#f5c518] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Trước
      </button>

      {currentPage > 3 && totalPages > 5 && (
        <>
          <button
            type="button"
            onClick={() => onChange(1)}
            className="h-10 w-10 rounded-xl border border-white/10 bg-white/[0.06] text-sm font-black text-white transition hover:border-[#f5c518] hover:text-[#f5c518]"
          >
            1
          </button>

          <span className="px-1 text-zinc-500">...</span>
        </>
      )}

      {pageRange.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onChange(page)}
          className={`h-10 w-10 rounded-xl text-sm font-black transition ${
            currentPage === page
              ? "bg-[#f5c518] text-black"
              : "border border-white/10 bg-white/[0.06] text-white hover:border-[#f5c518] hover:text-[#f5c518]"
          }`}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages - 2 && totalPages > 5 && (
        <>
          <span className="px-1 text-zinc-500">...</span>

          <button
            type="button"
            onClick={() => onChange(totalPages)}
            className="h-10 w-10 rounded-xl border border-white/10 bg-white/[0.06] text-sm font-black text-white transition hover:border-[#f5c518] hover:text-[#f5c518]"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        type="button"
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-10 rounded-xl border border-white/10 bg-white/[0.06] px-4 text-sm font-black text-white transition hover:border-[#f5c518] hover:text-[#f5c518] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Sau
      </button>
    </div>
  );
};

const Movies = () => {
  const [keyword, setKeyword] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortType, setSortType] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const { data: movies = [], isLoading, isError, error } = useMovieList("GP01");

  const { hotMovies, showingMovies } = useMemo(
    () => getCategoryMovies(movies),
    [movies],
  );

  const filteredMovies = useMemo(() => {
    return getFilteredMovies({
      movies,
      keyword,
      activeFilter,
      sortType,
    });
  }, [activeFilter, keyword, movies, sortType]);

  const totalPages = Math.max(1, Math.ceil(filteredMovies.length / pageSize));
  const activePage = Math.min(currentPage, totalPages);

  const paginatedMovies = useMemo(() => {
    const startIndex = (activePage - 1) * pageSize;

    return filteredMovies.slice(startIndex, startIndex + pageSize);
  }, [activePage, filteredMovies, pageSize]);

  const startResult = filteredMovies.length
    ? (activePage - 1) * pageSize + 1
    : 0;

  const endResult = Math.min(activePage * pageSize, filteredMovies.length);

  const handleChangeKeyword = (event) => {
    setKeyword(event.target.value);
    setCurrentPage(1);
  };

  const handleChangeFilter = (filterValue) => {
    setActiveFilter(filterValue);
    setCurrentPage(1);
  };

  const handleChangeSortType = (event) => {
    setSortType(event.target.value);
    setCurrentPage(1);
  };

  const handleChangePageSize = (event) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleChangePage = (page) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="bg-black text-white">
      <section className="border-b border-white/10 bg-[#070b1a]">
        <div className="cine-container py-10 md:py-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_330px] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.28em] text-[#f5c518]">
                Cinestar Movie Ticket
              </p>

              <div className="mt-3 flex items-center gap-3">
                <span className="h-10 w-1 rounded-full bg-[#f5c518]" />

                <h1 className="text-4xl font-black tracking-[-0.05em] text-white md:text-6xl">
                  Thư viện phim
                </h1>

                <ChevronRight size={34} className="text-zinc-500" />
              </div>

              <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-zinc-300">
                Tìm kiếm phim, lọc theo trạng thái và phân trang danh sách phim
                ngay trên giao diện.
              </p>
            </div>

            <aside className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#f5c518]">
                Tổng quan
              </p>

              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl bg-black/30 p-3">
                  <p className="text-xl font-black text-[#f5c518]">
                    {movies.length}
                  </p>

                  <p className="mt-1 text-xs font-bold text-zinc-400">
                    Phim
                  </p>
                </div>

                <div className="rounded-xl bg-black/30 p-3">
                  <p className="text-xl font-black text-[#f5c518]">
                    {showingMovies.length}
                  </p>

                  <p className="mt-1 text-xs font-bold text-zinc-400">
                    Đang chiếu
                  </p>
                </div>

                <div className="rounded-xl bg-black/30 p-3">
                  <p className="text-xl font-black text-[#f5c518]">
                    {hotMovies.length}
                  </p>

                  <p className="mt-1 text-xs font-bold text-zinc-400">
                    Hot
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="cine-container py-10 md:py-14">
        <section className="rounded-[28px] border border-white/10 bg-[#070b1a] p-5 md:p-7">
          <SectionHeading title="Tất cả phim" icon={Ticket} />

          <div className="grid gap-3 border-b border-white/10 pb-5 lg:grid-cols-[1fr_180px_170px]">
            <label className="flex h-12 items-center gap-3 rounded-xl bg-white px-4 text-zinc-500">
              <Search size={19} />

              <input
                value={keyword}
                onChange={handleChangeKeyword}
                placeholder="Tìm phim theo tên, ví dụ: bố già, lật mặt..."
                className="w-full bg-transparent text-sm font-semibold text-zinc-900 outline-none placeholder:text-zinc-500"
              />
            </label>

            <label className="flex h-12 items-center gap-3 rounded-xl border border-white/15 bg-white/[0.06] px-4 text-zinc-300">
              <SlidersHorizontal size={18} />

              <select
                value={sortType}
                onChange={handleChangeSortType}
                className="w-full bg-transparent text-sm font-black text-white outline-none"
              >
                {sortList.map((sort) => (
                  <option
                    key={sort.value}
                    value={sort.value}
                    className="bg-zinc-900"
                  >
                    {sort.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex h-12 items-center gap-3 rounded-xl border border-white/15 bg-white/[0.06] px-4 text-zinc-300">
              <span className="text-sm font-bold text-zinc-400">
                Hiển thị
              </span>

              <select
                value={pageSize}
                onChange={handleChangePageSize}
                className="w-full bg-transparent text-sm font-black text-white outline-none"
              >
                {pageSizeOptions.map((size) => (
                  <option key={size} value={size} className="bg-zinc-900">
                    {size} phim
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-5 flex gap-3 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {filterList.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => handleChangeFilter(filter.value)}
                className={`whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-black transition ${
                  activeFilter === filter.value
                    ? "border-[#f5c518] bg-[#f5c518] text-black"
                    : "border-white/20 bg-white/[0.04] text-white hover:border-[#f5c518] hover:text-[#f5c518]"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="mt-4 flex flex-col justify-between gap-2 text-sm font-semibold text-zinc-400 md:flex-row md:items-center">
            <p>
              Tìm thấy{" "}
              <span className="font-black text-[#f5c518]">
                {filteredMovies.length}
              </span>{" "}
              phim
              {keyword.trim() && (
                <>
                  {" "}
                  cho từ khóa{" "}
                  <span className="font-black text-white">
                    “{keyword.trim()}”
                  </span>
                </>
              )}
            </p>

            <p>
              Đang hiển thị {startResult} - {endResult} /{" "}
              {filteredMovies.length}
            </p>
          </div>

          {isError && (
            <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-950/30 p-5 text-sm font-semibold text-red-200">
              {error?.message || "Không tải được danh sách phim."}
            </div>
          )}

          <div className="mt-7 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {isLoading
              ? Array.from({ length: pageSize }).map((_, index) => (
                  <MovieCardSkeleton key={index} />
                ))
              : paginatedMovies.map((movie) => (
                  <div key={movie.maPhim} className="flex justify-center">
                    <MovieCard movie={movie} />
                  </div>
                ))}
          </div>

          {!isLoading && filteredMovies.length === 0 && (
            <div className="mt-8 rounded-2xl border border-white/10 bg-black/25 p-10 text-center">
              <Sparkles size={42} className="mx-auto text-zinc-500" />

              <p className="mt-4 text-lg font-black text-white">
                Không tìm thấy phim phù hợp
              </p>

              <p className="mt-2 text-sm text-zinc-400">
                Bạn thử nhập từ khóa khác hoặc đổi bộ lọc nhé.
              </p>
            </div>
          )}

          <Pagination
            currentPage={activePage}
            totalPages={totalPages}
            onChange={handleChangePage}
          />
        </section>

        <MovieRow
          title="Phim hot"
          subtitle="Danh sách phim nổi bật từ hệ thống."
          movies={hotMovies}
          icon={Flame}
          isLoading={isLoading}
        />

        <MovieRow
          title="Đang chiếu"
          subtitle="Các phim đang có lịch chiếu để bạn đặt vé ngay."
          movies={showingMovies}
          icon={Clapperboard}
          isLoading={isLoading}
        />
      </section>
    </main>
  );
};

export default Movies;