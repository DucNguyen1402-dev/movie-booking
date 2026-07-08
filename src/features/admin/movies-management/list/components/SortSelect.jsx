import {setSortType} from "../redux/slice";
import {selectSortType} from "../redux/selectors";
import {useDispatch, useSelector} from "react-redux";


export default function SortSelect() {

  const sortType = useSelector(selectSortType);

  const dispatch = useDispatch();

  const onChange = (e) => dispatch(setSortType(e.target.value));

  return (
    <select
      value={sortType}
      onChange={onChange}
      className="h-10 rounded-lg border border-slate-700 bg-[#0f172a] px-3 text-sm text-slate-200shadow-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
    >
      <option value="">Sort By</option>

      <optgroup label="Rating">
        <option value="rating-desc">Highest Rating</option>
        <option value="rating-asc">Lowest Rating</option>
      </optgroup>

      <optgroup label="Release Date">
        <option value="date-desc">Newest Release</option>
        <option value="date-asc">Oldest Release</option>
      </optgroup>

      <optgroup label="Movie Name">
        <option value="name-asc">A → Z</option>
        <option value="name-desc">Z → A</option>
      </optgroup>
    </select>
  );
}