import { useMemo } from "react";
export const usePaginationDerived = ({ pagination, items }) =>
  useMemo(() => {
    const startIndex = (pagination.page - 1) * pagination.size;

    const endIndex = pagination.page * pagination.size;

    const list = items.slice(startIndex, endIndex);

    const totalItems = items.length;
    const displayStart =
      totalItems === 0 ? 0 : (pagination.page - 1) * pagination.size + 1;
    const displayEnd = Math.min(pagination.page * pagination.size, totalItems);

    const totalPages = Math.ceil(totalItems / pagination.size);

    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    const isPrevDisabled = pagination.page === 1;
    const isNextDisabled = pagination.page >= totalPages;

    const pageOffset = (pagination.page - 1) * pagination.size;

    return {
      list,
      displayStart,
      totalItems,
      displayEnd,
      pages,
      isPrevDisabled,
      isNextDisabled,
      pageOffset,
    };
  }, [pagination, items]);
