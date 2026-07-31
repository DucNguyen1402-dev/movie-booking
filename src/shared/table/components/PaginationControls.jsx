import { Button } from "@shared/ui";
import { cn } from "@shared/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PaginationControls = ({ pagination, label }) => {
  const {
    state: {
      currentPage,
      pages,
      displayStart,
      displayEnd,
      totalItems,
      isPrevDisabled,
      isNextDisabled,
    },
    actions: { onPrevClick, onNextClick, onPageClick },
  } = pagination;
  return (
    <div className="flex items-center justify-between px-4 text-sm text-slate-400">
      <p className="text-sm text-slate-400">
        Hiển thị{" "}
        <span className="font-medium text-slate-200">
          {displayStart}-{displayEnd}
        </span>{" "}
        trên <span className="font-medium text-slate-200">{totalItems}</span>{" "}
        {label}
      </p>

      <div className="flex gap-2">
        <Button
          disabled={isPrevDisabled}
          size="sm"
          className={cn(
            "rounded border px-1.5 transition-colors duration-300",
            isPrevDisabled
              ? "cursor-default text-slate-500"
              : "cursor-pointer hover:bg-slate-800",
          )}
          onClick={onPrevClick}
        >
          <ChevronLeft className="size-5" />
        </Button>
        {pages.map((page) => {
          const isCurrentPage = page === currentPage;
          return (
            <Button
              key={page}
              size="none"
              className={cn(
                "min-w-8 rounded border border-slate-400 transition-colors duration-300",
                isCurrentPage
                  ? "cursor-default bg-orange-600 text-white"
                  : "cursor-pointer hover:bg-orange-500 hover:text-slate-100",
              )}
              onClick={() => onPageClick(page)}
            >
              {page}
            </Button>
          );
        })}
        <Button
          disabled={isNextDisabled}
          size="sm"
          className={cn(
            "rounded border px-1.5 transition-colors duration-300",
            isNextDisabled
              ? "cursor-default text-slate-500"
              : "cursor-pointer hover:bg-slate-800",
          )}
          onClick={onNextClick}
        >
          <ChevronRight className="size-5" />
        </Button>
      </div>
    </div>
  );
};

export default PaginationControls;
