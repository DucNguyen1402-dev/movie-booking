import { useMemo, useState, useEffect } from "react";

export function useMoviePagination({ movies }) {
  const [pagination, setPagination] = useState({ page: 1, size: 10 });
  const setSize = (value) =>
    setPagination((prev) => ({ ...prev, size: Number(value), page: 1 }));
  const setPage = (value) =>
    setPagination((prev) => ({ ...prev, page: Number(value) }));

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  }, [movies]);

  const startIndex = (pagination.page - 1) * pagination.size;
  const endIndex = pagination.page * pagination.size;

  const paginatedMovieList = useMemo(() => {
    return movies.slice(startIndex, endIndex);
  }, [startIndex, endIndex, movies]);

  return {
    paginatedMovieList,
    setSize,
    setPage,
    pagination,
  };
}
