import { useMemo, useState } from "react";
import { movieSortMapping } from "@features/admin/movies/list/config";
import { applySort, applyFilter } from "@features/admin/movies/list/utils";

export function useMovieParams({ movies }) {
  const [params, setParams] = useState({
    keyword: "",
    status: "",
    sortType: "",
  });

  const setKeyword = (value) =>
    setParams((prev) => ({ ...prev, keyword: value }));
  const setStatus = (value) =>
    setParams((prev) => ({ ...prev, status: value }));
  const setSortType = (value) =>
    setParams((prev) => ({ ...prev, sortType: value }));

  const list = useMemo(() => {
    const list = applyFilter(movies, params.keyword, params.status);
    const sortFn = movieSortMapping[params.sortType];
    return sortFn ? applySort([...list], sortFn) : list;
  }, [params, movies]);

  const resetSearchKeyword = () =>
    setParams((prev) => ({ ...prev, keyword: "" }));
  return {
    list,
    states: {
      keyword: params.keyword,
      status: params.status,
      sortType: params.sortType,
    },
    setSortType,
    setStatus,
    setKeyword,
    resetSearchKeyword,
  };
}
