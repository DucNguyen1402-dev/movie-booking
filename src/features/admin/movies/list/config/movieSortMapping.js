export const movieSortMapping = {
  "rating-desc": (a, b) => b.danhGia - a.danhGia,
  "rating-asc": (a, b) => a.danhGia - b.danhGia,

  "date-desc": (a, b) =>
    new Date(b.ngayKhoiChieu) - new Date(a.ngayKhoiChieu),

  "date-asc": (a, b) =>
    new Date(a.ngayKhoiChieu) - new Date(b.ngayKhoiChieu),

  "name-asc": (a, b) => a.tenPhim.localeCompare(b.tenPhim),
  "name-desc": (a, b) => b.tenPhim.localeCompare(a.tenPhim),
};

