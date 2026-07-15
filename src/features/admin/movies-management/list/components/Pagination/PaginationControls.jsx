import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMovieContext } from "../../contexts/MovieContext";

export default function PaginationControls() {
  const {
    processedMovies,
    moviePagination: { pagination, setPage },
  } = useMovieContext();

  const totalMovies = processedMovies.length;

  const displayStart =
    totalMovies === 0 ? 0 : (pagination.page - 1) * pagination.size + 1;
  const displayEnd = Math.min(pagination.page * pagination.size, totalMovies);

  const totalPages = Math.ceil(processedMovies.length / pagination.size);

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const isPrevDisabled = pagination.page === 1;
  const isNextDisabled = pagination.page >= totalPages;

  return (
    <div className="flex items-center justify-between px-8 text-sm text-slate-400">
      <p className="text-sm text-slate-400">
        Hiển thị{" "}
        <span className="font-medium text-slate-200">
          {displayStart}-{displayEnd}
        </span>{" "}
        trên <span className="font-medium text-slate-200">{totalMovies}</span>{" "}
        phim
      </p>

      <div className="flex gap-2">
        <button
          disabled={isPrevDisabled}
          className={`cursor-pointer rounded border px-2 py-1 transition-colors duration-300 ${isPrevDisabled ? "text-slate-500" : "hover:bg-slate-800"}`}
          onClick={() => setPage(pagination.page - 1)}
        >
          <ChevronLeft className="size-5" />
        </button>
        {pages.map((page) => {
          const isCurrentPage = pagination.page === page;

          return (
            <button
              key={page}
              className={`cursor-pointer rounded border border-slate-400 px-3 py-2 transition-colors duration-300 ${isCurrentPage ? "bg-orange-500 text-white" : "hover:bg-orange-500 hover:text-slate-100"}`}
              onClick={() => setPage(Number(page))}
            >
              {page}
            </button>
          );
        })}
        <button
          disabled={isNextDisabled}
          className={`cursor-pointer rounded border px-2 py-1 transition-colors duration-300 ${isNextDisabled ? "text-slate-500" : "hover:bg-slate-800"}`}
          onClick={() => setPage(pagination.page + 1)}
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
