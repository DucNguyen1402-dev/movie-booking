import { useMemo, useState } from "react";

const sortMethods = {
  asc: (a, b) => a.revenue - b.revenue,
  desc: (a, b) => b.revenue - a.revenue,
};

export function useRevenueRanking({ movies }) {
  const [params, setParams] = useState({ keyword: "", sortDesc: true });

  const resetSearchParam = () =>
    setParams((prev) => ({ ...prev, keyword: "" }));

  const filteredMovies = useMemo(() => {
    const keyword = params.keyword.trim().toLowerCase();
    const sortMethod = sortMethods[params.sortDesc ? "desc" : "asc"];

    return movies
      .filter(
        (movie) => !keyword || movie.tenPhim.toLowerCase().includes(keyword),
      )
      .sort(sortMethod);
  }, [movies, params.keyword, params.sortDesc]);

  const onSearchMovie = (value) =>
    setParams((prev) => ({ ...prev, keyword: value }));
  const onSortClick = () =>
    setParams((prev) => ({ ...prev, sortDesc: !prev.sortDesc }));

  return {
    params,
    onSearchMovie,
    onSortClick,
    filteredMovies,
    resetSearchParam,
  };
}
