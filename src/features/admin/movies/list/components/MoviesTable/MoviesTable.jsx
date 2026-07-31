import { useCallback, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import {
  createEmptyStateContent,
  PaginationControls,
  TableEmptyState,
} from "@shared/table";
import { EmptyStateButton } from "@shared/ui";

import {
  useConsumeLocationState,
  useTemporaryState,
} from "@features/admin/hooks";
import { useMovieListContext } from "@features/admin/movies/list/contexts";
import { ENTITIES } from "@features/admin/shared/config";

import MovieItem from "./MovieItem";
import MovieTableSkeleton from "./MovieTableSkeleton";

const MoviesTable = () => {
  const location = useLocation();

  const [rowState] = useTemporaryState({
    movieId: location.state?.movieId,
    highlight: location.state?.highlight,
  });

  useConsumeLocationState(["movieId", "highlight"]);

  const hasMoveToPage = useRef(false);
  const {
    pagination,
    raw: { isPending, isFetching },
    processed: {
      list,
      state: { keyword },
      actions: { resetSearchKeyword },
    },
  } = useMovieListContext();

  if (rowState?.movieId) {
    pagination.actions.preventNextResetPage();
  }

  const {
    state: { currentSize },
    actions: { setPage },
  } = pagination;

  const moveToMoviePage = useCallback(
    (id) => {
      const movieIndex = list.findIndex((movie) => movie.maPhim === Number(id));
      if (movieIndex === -1) return;

      const moviePage = Math.floor(movieIndex / currentSize) + 1;

      setPage(moviePage);
    },
    [currentSize, list, setPage],
  );

  useEffect(() => {
    if (!rowState?.movieId || isFetching || hasMoveToPage.current) return;
    moveToMoviePage(rowState?.movieId);
    hasMoveToPage.current = true;
  }, [rowState?.movieId, isFetching, moveToMoviePage]);

  const isEmptyMovieList = pagination.state.totalItems === 0;

  const renderTableContent = () => {
    if (isPending) {
      return <MovieTableSkeleton />;
    }

    if (isEmptyMovieList) {
      return (
        <TableEmptyState
          colSpan={6}
          {...createEmptyStateContent(ENTITIES.movie, keyword)}
        >
          <EmptyStateButton surface="dark" onClick={resetSearchKeyword}>
            Xóa bộ lọc
          </EmptyStateButton>
        </TableEmptyState>
      );
    }

    return pagination.state.list.map((movie) => (
      <MovieItem
        key={movie.maPhim}
        movie={movie}
        movieId={rowState?.movieId}
        highlight={rowState?.highlight}
      />
    ));
  };

  return (
    <div className="flex min-h-screen flex-col space-y-8">
      {!isEmptyMovieList && (
        <PaginationControls pagination={pagination} label="phim" />
      )}
      <div className="flex-1 overflow-hidden rounded-lg border border-slate-800/80 bg-[#1e293b] shadow-xl">
        <table className="w-full table-fixed border-collapse text-left">
          <thead>
            <tr className="bg-slate-900/80 text-sm font-medium tracking-wider text-slate-400 uppercase">
              <th className="3xl:w-30 py-8 pl-8 2xl:w-20">Mã</th>
              <th className="3xl:w-120 px-4 2xl:w-100">Hình ảnh & Tên phim</th>
              <th className="3xl:w-50 px-4 2xl:w-40">Ngày khởi chiếu</th>
              <th className="3xl:w-40 px-4 2xl:w-35">Đánh giá</th>
              <th className="3xl:w-40 px-4 2xl:w-35">Trạng thái</th>
              <th className="3xl:w-40 px-4 2xl:w-40">Hành động</th>
            </tr>
          </thead>
          <tbody className="text-sm">{renderTableContent()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default MoviesTable;
