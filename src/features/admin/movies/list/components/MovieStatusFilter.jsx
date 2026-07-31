import { Select } from "@shared/fields";

import { useMovieListContext } from "@features/admin/movies/list/contexts";

const options = [
  { label: "Tất cả trạng thái", value: "" },
  { label: "Đang chiếu", value: "dangChieu" },
  { label: "Sắp chiếu", value: "sapChieu" },
];

const MovieStatusFilter = () => {
  const {
    processed: {
      state: { status },
      actions: { setStatus },
    },
  } = useMovieListContext();

  const onSelect = (e) => setStatus(e.target.value);

  return <Select value={status} onChange={onSelect} options={options} />;
};

export default MovieStatusFilter;
