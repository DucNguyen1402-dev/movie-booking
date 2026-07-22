import { useState, useMemo } from "react";

export function useRevenueRankingFilter({ movies }) {

  const [filter, setFilter] = useState({ keyword: "", sortDesc: true });

  const sortMethods = {
    asc: (a, b) => a.revenue - b.revenue,
    desc: (a, b) => b.revenue - a.revenue,
  };

  const resetSearchFilter = () => setFilter((prev) => ({...prev, keyword: ""}));

  const filteredMovies = useMemo(() => {
    const keyword = filter.keyword.trim().toLowerCase();
    const sortMethod = sortMethods[filter.sortDesc ? "desc" : "asc"];

    return movies
      .filter(
        (movie) => !keyword || movie.tenPhim.toLowerCase().includes(keyword),
      )
      .sort(sortMethod);
  }, [movies, filter.keyword, filter.sortDesc]);

  const onSearchMovie = (value) =>
    setFilter((prev) => ({ ...prev, keyword: value }));
  const onSortClick = (value) => setFilter((prev) => ({ ...prev, sortDesc: !prev.sortDesc }));

  return {
    filter,
    onSearchMovie,
    onSortClick,
    filteredMovies,
    resetSearchFilter
  };
}
