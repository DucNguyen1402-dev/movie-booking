import { useSelector, useDispatch } from "react-redux";
import { useMovies } from "@hooks/admin/useMovies";
import {
  selectKeyword,
  selectStatus,
  selectSortType,
} from "../redux/selectors";

import { setKeyword } from "../redux/slice";
import { useMemo } from "react";

const sortMapping = {
  "rating-desc": (a, b) => b.danhGia - a.danhGia,
  "rating-asc": (a, b) => a.danhGia - b.danhGia,

  "date-desc": (a, b) => new Date(b.ngayKhoiChieu) - new Date(a.ngayKhoiChieu),
  "date-asc": (a, b) => new Date(a.ngayKhoiChieu) - new Date(b.ngayKhoiChieu),

  "name-asc": (a, b) => a.tenPhim.localeCompare(b.tenPhim),
  "name-desc": (a, b) => b.tenPhim.localeCompare(a.tenPhim),
};

const applySort = (movies, sortFn) => movies.sort(sortFn);

const applyFilter = (movies, keyword, status) =>
  movies.filter((movie) => {
    const matchKeyword =
      !keyword ||
      movie.tenPhim.toLowerCase().includes(keyword) ||
      movie.biDanh.toLowerCase().includes(keyword);

    const matchStatus = !status || movie[status];

    return matchKeyword && matchStatus;
  });

export function useFilteredMovies({ movies }) {
  const dispatch = useDispatch();

  const keyword = useSelector(selectKeyword).trim().toLowerCase();
  const status = useSelector(selectStatus);
  const sortType = useSelector(selectSortType);

  const resetSearchKeyword = () => dispatch(setKeyword(""));

  const list = useMemo(() => {
    const list = applyFilter(movies, keyword, status);
    const sortFn = sortMapping[sortType];
    return sortFn ? applySort([...list], sortFn) : list;
  }, [movies, keyword, status, sortType]);

  return {
    list,
    states: { keyword, status, sortType },
    resetSearchKeyword,
  };
}
