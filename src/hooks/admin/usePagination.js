import { useMemo, useState, useEffect, useRef } from "react";

export function usePagination({ items, resetDeps }) {
  const [pagination, setPagination] = useState({ page: 1, size: 10 });
  const skipNextPageReset = useRef(false);

  const setSize = (value) =>
    setPagination((prev) => ({ ...prev, size: Number(value), page: 1 }));
  const setPage = (value) =>
    setPagination((prev) => ({ ...prev, page: Number(value) }));

  useEffect(() => {
    if (skipNextPageReset.current) {
      skipNextPageReset.current = false;
      return;
    }
    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  }, [...resetDeps]);

  const startIndex = (pagination.page - 1) * pagination.size;
  const endIndex = pagination.page * pagination.size;

  const list = useMemo(() => {
    return items.slice(startIndex, endIndex);
  }, [startIndex, endIndex, items]);

  const totalMovies = items.length;
  const displayStart =
    totalMovies === 0 ? 0 : (pagination.page - 1) * pagination.size + 1;
  const displayEnd = Math.min(pagination.page * pagination.size, totalMovies);

  const totalPages = Math.ceil(items.length / pagination.size);

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const isPrevDisabled = pagination.page === 1;
  const isNextDisabled = pagination.page >= totalPages;

  const onPrevClick = () => setPage(pagination.page - 1);
  const onNextClick = () => setPage(pagination.page + 1);

  const onPageClick = (page) => setPage(Number(page));

  return {
    totalMovies,
    skipNextPageReset,
    controls: {
      currentPage: pagination.page,
      onPrevClick,
      onNextClick,
      onPageClick,
      total: totalMovies,
      isPrevDisabled,
      isNextDisabled,
      pages,
      displayStart,
      displayEnd,
    },
    list,
    setSize,
    setPage,
    currentSize: pagination.size,
  };
}
