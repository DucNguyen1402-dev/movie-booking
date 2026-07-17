import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginationControls({ controls, label }) {
  const {
    currentPage,
    pages,
    displayStart,
    displayEnd,
    total,
    isPrevDisabled,
    isNextDisabled,
    onPrevClick,
    onNextClick,
    onPageClick,
  } = controls;
  return (
    <div className="flex items-center justify-between px-4 text-sm text-slate-400">
      <p className="text-sm text-slate-400">
        Hiển thị{" "}
        <span className="font-medium text-slate-200">
          {displayStart}-{displayEnd}
        </span>{" "}
        trên <span className="font-medium text-slate-200">{total}</span> {label}
      </p>

      <div className="flex gap-2">
        <button
          disabled={isPrevDisabled}
          className={`cursor-pointer rounded border px-1.5 transition-colors duration-300 ${isPrevDisabled ? "text-slate-500" : "hover:bg-slate-800"}`}
          onClick={onPrevClick}
        >
          <ChevronLeft className="size-5" />
        </button>
        {pages.map((page) => {
          const isCurrentPage = page === currentPage;
          return (
            <button
              key={page}
              className={`cursor-pointer rounded border border-slate-400 px-2.5 py-1.5 transition-colors duration-300 ${isCurrentPage ? "bg-orange-600 text-white" : "hover:bg-orange-500 hover:text-slate-100"}`}
              onClick={() => onPageClick(page)}
            >
              {page}
            </button>
          );
        })}
        <button
          disabled={isNextDisabled}
          className={`cursor-pointer rounded border px-1.5 transition-colors duration-300 ${isNextDisabled ? "text-slate-500" : "hover:bg-slate-800"}`}
          onClick={onNextClick}
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
