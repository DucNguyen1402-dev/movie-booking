import { Input } from "@shared/fields";
import { Search } from "lucide-react";

import { useMovieListContext } from "@features/admin/movies/list/contexts";

const SearchBar = () => {
  const {
    processed: {
      state: { keyword },
      actions: { setKeyword },
    },
  } = useMovieListContext();
  const onSearch = (e) => setKeyword(e.target.value);

  return (
    <Input
      value={keyword}
      leftIcon={Search}
      placeholder="Tìm tên phim (bí danh)..."
      inputClassName="pl-10 text-sm text-slate-200 placeholder-slate-500 "
      onChange={onSearch}
    />
  );
};

export default SearchBar;
