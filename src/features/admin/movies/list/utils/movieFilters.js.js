export const applySort = (movies, sortFn) => {
  return [...movies].sort(sortFn);
};

export const applyFilter = (movies, keyword, status) => {
  return movies.filter((movie) => {
    const matchKeyword =
      !keyword ||
      movie.tenPhim.toLowerCase().includes(keyword) ||
      movie.biDanh.toLowerCase().includes(keyword);

    const matchStatus = !status || movie[status];

    return matchKeyword && matchStatus;
  });
};