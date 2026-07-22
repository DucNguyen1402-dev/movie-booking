import { Search } from "lucide-react";
import {useDispatch} from "react-redux";
import {setKeyword} from "../contexts/redux/slice"
import {useSelector} from "react-redux"
import {selectKeyword} from "../contexts/redux/selectors"

export default function SearchBar() {
  const dispatch = useDispatch();
  const keyword = useSelector(selectKeyword);
  const onSearch = (e) => dispatch(setKeyword(e.target.value));
  
  return (
    <div className="relative col-span-1 sm:col-span-1">
      <input
        value ={keyword}
        type="text"
        placeholder="Tìm tên phim (bí danh)..."
        className="w-full rounded-md border border-slate-700 bg-[#0f172a] px-4 py-2 pl-10 text-sm text-slate-200 placeholder-slate-500 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        onChange = {onSearch}
      />
      <Search className="absolute top-3 left-3.5 h-4 w-4 text-slate-500" />
    </div>
  );
}
