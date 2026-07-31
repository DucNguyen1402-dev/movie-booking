import { useCallback } from "react";

export function usePaginationActions({
  setPagination,
  pagination,
  setSkipNextPageResetRef,
}) {
  const setSize = useCallback(
    (value) =>
      setPagination((prev) => ({ ...prev, size: Number(value), page: 1 })),
    [setPagination],
  );

  const setPage = useCallback(
    (value) => setPagination((prev) => ({ ...prev, page: Number(value) })),
    [setPagination],
  );

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

  const preventNextResetPage = useCallback(
    () => setSkipNextPageResetRef(true),
    [setSkipNextPageResetRef],
  );

  return {
    preventNextResetPage,
    onPrevClick,
    onNextClick,
    onPageClick,
    setSize,
    setPage,
  };
}
