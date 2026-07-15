import { useMemo, useState, useEffect, useRef } from "react";

export function useMoviePagination({ movies, keyword, status, sortType }) {
  const [pagination, setPagination] = useState({ page: 1, size: 10 });
  const skipNextPageReset = useRef(false);

  const setSize = (value) =>
    setPagination((prev) => ({ ...prev, size: Number(value), page: 1 }));
  const setPage = (value) =>
    setPagination((prev) => ({ ...prev, page: Number(value) }));

  const moveToMoviePage = (id) => {
    const movieIndex = movies.findIndex((movie) => movie.maPhim === Number(id));
    console.log("id", id);
    console.log("movies", movies);
    if (movieIndex === -1) return;

    const moviePage = Math.floor(movieIndex / pagination.size) + 1;

    setPagination((prev) => ({ ...prev, page: moviePage }));
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
  }, [keyword, status, sortType]);

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
    skipNextPageReset,
    moveToMoviePage,
  };
}
