import { useState, useMemo, useEffect } from "react";

export function useUserPagination({ filteredUsers }) {
  const [pagination, setPagination] = useState({ page: 1, size: 10 });

  const setSize = (size) =>
    setPagination({
      page: 1,
      size: Number(size),
    });

  const setPage = (page) => setPagination((prev) => ({ ...prev, page }));

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  }, [filteredUsers]);

  const startIndex = (pagination.page - 1) * pagination.size;
  const endIndex = pagination.page * pagination.size;

  const paginatedUsers = useMemo(
    () => filteredUsers.slice(startIndex, endIndex),
    [startIndex, endIndex, filteredUsers],
  );

  return {
    pagination,
    setPage,
    setSize,
    paginatedUsers,
  };
}
