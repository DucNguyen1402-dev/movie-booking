import { useState, useMemo, useRef, useEffect } from "react";

export function useUserPagination({ filteredUsers ,keyword, role}) {
  const [pagination, setPagination] = useState({ page: 1, size: 10 });
  const skipNextPageReset = useRef(false);

  const setSize = (size) =>
    setPagination({
      page: 1,
      size: Number(size),
    });

  const setPage = (page) => setPagination((prev) => ({ ...prev, page }));

  const moveToAccountPage = (account) => {
    const userIndex = filteredUsers.findIndex(
      (user) => user.taiKhoan === account,
    );

    if (userIndex === -1) return;

    const targetPage = Math.floor(userIndex / pagination.size) + 1;

    setPagination((prev) => ({ ...prev, page: targetPage }));
  };


  useEffect(() => {
    if (skipNextPageReset.current) {
      skipNextPageReset.current = false;
      return;
    }
    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  }, [keyword, role]);

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
    moveToAccountPage,
    skipNextPageReset
  };
}
