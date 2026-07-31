import { useEffect } from "react";

export function usePaginationEffect({
  skipNextPageResetRef,
  setSkipNextPageResetRef,
  enabled,
  setPagination,
  resetDeps,
  pagination,
  items,
}) {
  useEffect(() => {
    if (skipNextPageResetRef.current) {
      setSkipNextPageResetRef(false);
      return;
    }
    if (!enabled) return;

    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...resetDeps, setPagination, enabled]);

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(items.length / pagination.size));

    if (pagination.page > totalPages) {
      setPagination((prev) => ({
        ...prev,
        page: totalPages,
      }));
    }
  }, [items.length, pagination.page, pagination.size, setPagination]);
}
