import { Select } from "@shared/fields";

import { useMovieListContext } from "@features/admin/movies/list/contexts";

const options = [
  {
    label: "Đánh giá",
    options: [
      { label: "Đánh giá cao nhất", value: "rating-desc" },
      { label: "Đánh giá thấp nhất", value: "rating-asc" },
    ],
  },
  {
    label: "Ngày khởi chiếu",
    options: [
      { label: "Mới khởi chiếu", value: "date-desc" },
      { label: "Khởi chiếu lâu nhất", value: "date-asc" },
    ],
  },
  {
    label: "Tên phim",
    options: [
      { label: "A → Z", value: "name-asc" },
      { label: "Z → A", value: "name-desc" },
    ],
  },
];

const SortSelect = () => {
  const {
    processed: {
      state: { sortType },
      actions: { setSortType },
    },
  } = useMovieListContext();

  const onChange = (e) => setSortType(e.target.value);

  return (
    <Select
      value={sortType}
      onChange={onChange}
      options={options}
      defaultOptionLabel="Sắp xếp mặc định"
    ></Select>
  );
};

export default SortSelect;
