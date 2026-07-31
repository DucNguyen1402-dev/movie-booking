import { useMemo } from "react";

import { usePaginationActions } from "./usePaginationActions";
import { usePaginationDerived } from "./usePaginationDerived";
import { usePaginationEffect } from "./usePaginationEffect";
import { usePaginationState } from "./usePaginationState";

export function usePagination({ items, resetDeps, enabled, pageSize }) {
  const {
    pagination,
    setPagination,
    skipNextPageResetRef,
    setSkipNextPageResetRef,
  } = usePaginationState({ pageSize });

  const {
    preventNextResetPage,
    onPrevClick,
    onNextClick,
    onPageClick,
    setSize,
    setPage,
  } = usePaginationActions({
    setPagination,
    pagination,
    setSkipNextPageResetRef,
  });

  usePaginationEffect({
    skipNextPageResetRef,
    setSkipNextPageResetRef,
    enabled,
    setPagination,
    resetDeps,
    pagination,
    items,
  });

  const {
    list,
    displayStart,
    totalItems,
    displayEnd,
    pages,
    isPrevDisabled,
    isNextDisabled,
    pageOffset,
  } = usePaginationDerived({ pagination, items });

  const values = useMemo(
    () => ({
      actions: {
        onPrevClick,
        onNextClick,
        onPageClick,
        setSize,
        setPage,
        preventNextResetPage,
      },
      state: {
        currentPage: pagination.page,
        totalItems,
        isPrevDisabled,
        isNextDisabled,
        pages,
        displayStart,
        displayEnd,
        list,
        pageOffset,
        currentSize: pagination.size,
      },
    }),
    [
      onPrevClick,
      onNextClick,
      onPageClick,
      setSize,
      setPage,
      preventNextResetPage,
      pagination.page,
      pagination.size,
      totalItems,
      isPrevDisabled,
      isNextDisabled,
      pages,
      displayStart,
      displayEnd,
      list,
      pageOffset,
    ],
  );

  return values;
}
