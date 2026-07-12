import { Search } from "lucide-react";
import { useUsersContext } from "../../contexts/UsersContext";

export default function UserToolbar() {
  const {
    userFilters: { filters, onSearch, onRoleFilter },
  } = useUsersContext();

  return (
    <div className="overflow-hidden rounded-md">
      <div className="grid grid-cols-5 gap-3 rounded-md border border-slate-700 bg-slate-800 p-4 text-white">
        <div className="relative col-span-3">
          <input
          value = {filters.keyword}
           onChange = {(e) => onSearch(e.target.value)}
            placeholder="Tìm theo tài khoản hoặc họ tên..."
            className="w-full rounded-md border border-slate-700 bg-[#0f172a] py-2.5 pr-10 pl-4 text-slate-100 outline-none placeholder:text-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
          <div className="absolute top-1/2 right-4 -translate-y-1/2">
            <Search className="size-5.5 text-slate-300" />
          </div>
        </div>

        <select 
         value = {filters.role}
         onChange = {(e) => onRoleFilter(e.target.value)}
        className="rounded-md border border-slate-700 bg-[#0f172a] px-4 text-slate-100 transition-colors duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20">
          <option value="all">Tất cả vai trò</option>
          <option value="QuanTri">Quản trị</option>
          <option value="KhachHang">Khách hàng</option>
        </select>

        <select className="rounded-md border border-slate-700 bg-[#0f172a] px-4 text-slate-100 transition-colors duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20">
          <option value="10">10 / trang</option>
          <option value="20">20 / trang</option>
          <option value="50">50 / trang</option>
        </select>
      </div>
    </div>
  );
}
