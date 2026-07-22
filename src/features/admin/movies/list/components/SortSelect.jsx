import { setSortType } from "../contexts/redux/slice";
import { selectSortType } from "../contexts/redux/selectors";
import { useDispatch, useSelector } from "react-redux";

export default function SortSelect() {
  const sortType = useSelector(selectSortType);

  const dispatch = useDispatch();

  const onChange = (e) => dispatch(setSortType(e.target.value));

  return (
    <select
      value={sortType}
      onChange={onChange}
      className="text-slate-200shadow-sm h-10 rounded-lg border border-slate-700 bg-[#0f172a] px-3 text-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
    >
      <option value="">Sắp xếp theo</option>

      <optgroup label="Đánh giá">
        <option value="rating-desc">Đánh giá cao nhất</option>
        <option value="rating-asc">Đánh giá thấp nhất</option>
      </optgroup>

      <optgroup label="Ngày khởi chiếu">
        <option value="date-desc">Mới khởi chiếu</option>
        <option value="date-asc">Khởi chiếu lâu nhất</option>
      </optgroup>

      <optgroup label="Tên phim">
        <option value="name-asc">A → Z</option>
        <option value="name-desc">Z → A</option>
      </optgroup>
    </select>
  );
}
