import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useMovieListContext } from "@features/admin/movies/list/contexts";
import { EmptyTable } from "@components/admin";
import { PaginationControls } from "@components/admin";
import { EmptyStateButton } from "@components/admin/buttons";

import MovieItem from "./MovieItem";
import MovieTableSkeleton from "./MovieTableSkeleton";

export default function MoviesTable() {
  const navigate = useNavigate();
  const location = useLocation();

  const [rowState, setRowState] = useState(() => ({
    movieId: location.state?.movieId ?? null,
    highlight: location.state?.highlight ?? "",
  }));

  const {
    pagination,
    raw: { isPending, isFetching },
    processed: {
      list,
      state: { keyword },
      actions: { resetSearchKeyword },
    },
  } = useMovieListContext();

  if (rowState.movieId) {
    pagination.preventNextReset();
  }

  const moveToMoviePage = useCallback(
    () => (id) => {
      const movieIndex = list.findIndex((movie) => movie.maPhim === Number(id));
      if (movieIndex === -1) return;

      const moviePage = Math.floor(movieIndex / pagination.currentSize) + 1;

      pagination.setPage(moviePage);
    },
    [list, pagination],
  );

  useEffect(() => {
    if (!rowState.movieId || isFetching) return;

    moveToMoviePage(rowState.movieId);

    navigate(location.pathname, {
      replace: true,
      state: {
        history: location.state?.history ?? [],
      },
    });
  }, [
    rowState.movieId,
    isFetching,
    rowState,
    location.pathname,
    location.state?.history,
    navigate,
    moveToMoviePage,
  ]);

  useEffect(() => {
    if (!rowState.highlight || !rowState.movieId) return;
    const keys = ["highlight", "movieId"];
    const timers = keys
      .filter((key) => rowState[key])
      .map((key) =>
        setTimeout(() => {
          setRowState((prev) => ({ ...prev, [key]: "" }));
        }, 10000),
      );

    return () => timers.forEach(clearTimeout);
  }, [rowState.highlight, rowState.movieId, rowState]);

  const isEmptyMovieList = pagination.list.length === 0;

  const renderTableContent = () => {
    if (isPending) {
      return <MovieTableSkeleton />;
    }

    if (isEmptyMovieList) {
      return (
        <EmptyTable
          colSpan={6}
          title="Không tìm thấy phim"
          description={`Không có tên user nào khớp với từ khóa "${keyword}"`}
        >
          <EmptyStateButton surface="dark" onClick={resetSearchKeyword}>
            Xóa bộ lọc
          </EmptyStateButton>
        </EmptyTable>
      );
    }

    return pagination.list.map((movie) => (
      <MovieItem
        key={movie.maPhim}
        movie={movie}
        movieId={rowState.movieId}
        highlight={rowState.highlight}
      />
    ));
  };

  return (
    <div className="flex min-h-screen flex-col space-y-8">
      {!isEmptyMovieList && (
        <PaginationControls controls={pagination.controls} label="phim" />
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
}
