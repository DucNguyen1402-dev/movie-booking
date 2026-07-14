import { useMovieContext } from "../../contexts/MovieContext";


export default function PaginationSelect() {

  const {moviePagination: {pagination, setSize}} = useMovieContext();

  return (
    <select
     onChange = {(e) => setSize(e.target.value)}
     value = {pagination.size}
     className="rounded-md border border-slate-700 bg-[#0f172a] px-4 text-slate-100 transition-colors duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20">
      <option value="10">10 / trang</option>
      <option value="20">20 / trang</option>
      <option value="50">50 / trang</option>
    </select>
  );
}
