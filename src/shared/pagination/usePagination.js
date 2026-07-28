import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export function usePagination({ items, resetDeps, enabled, size = 10 }) {
  const [pagination, setPagination] = useState({ page: 1, size });
  const skipNextPageReset = useRef(false);

  const preventNextReset = useCallback(() => {
    skipNextPageReset.current = true;
  }, []);

  const setSize = useCallback(
    (value) =>
      setPagination((prev) => ({ ...prev, size: Number(value), page: 1 })),
    [],
  );

  const setPage = useCallback(
    (value) => setPagination((prev) => ({ ...prev, page: Number(value) })),
    [],
  );

  useEffect(() => {
    if (skipNextPageReset.current) {
      skipNextPageReset.current = false;
      return;
    }
    if (!enabled) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...resetDeps, setPagination, enabled]);

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

  const onPrevClick = useCallback(() => {
    setPage(pagination.page - 1);
  }, [pagination.page, setPage]);

  const onNextClick = useCallback(() => {
    setPage(pagination.page + 1);
  }, [pagination, setPage]);

  const onPageClick = useCallback(
    (page) => {
      setPage(Number(page));
    },
    [setPage],
  );

  const pageOffset = useMemo(
    () => (pagination.page - 1) * pagination.size,
    [pagination],
  );

  const values = useMemo(
    () => ({
      totalMovies,
      skipNextPageReset,
      preventNextReset,
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
      currentPage: pagination.page,
      pageOffset,
    }),
    [
      displayEnd,
      displayStart,
      isNextDisabled,
      isPrevDisabled,
      list,
      onNextClick,
      onPageClick,
      onPrevClick,
      pageOffset,
      pages,
      pagination.page,
      pagination.size,
      setPage,
      setSize,
      totalMovies,
      preventNextReset,
    ],
  );

  return values;
}
