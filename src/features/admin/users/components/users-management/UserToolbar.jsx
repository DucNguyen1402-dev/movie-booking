import { Search } from "lucide-react";
import { useUsersContext } from "../../contexts/UsersContext";
import { PAGE_SIZE_OPTIONS, USER_ROLE_OPTIONS } from "@config/admin";
import { Select } from "@components/admin";

export default function UserToolbar() {
  const {
    userFilters: { filters, onSearch, onRoleFilter },
    userPagination: { setSize, pagination },
  } = useUsersContext();

  return (
    <div className="overflow-hidden rounded-md">
      <div className="grid grid-cols-5 gap-3 rounded-md border border-slate-700 bg-slate-800 p-4 text-white">
        <div className="relative col-span-3">
          <input
            value={filters.keyword}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Tìm theo tài khoản hoặc họ tên..."
            className="w-full rounded-md border border-slate-700 bg-[#0f172a] py-2.5 pr-10 pl-4 text-slate-100 outline-none placeholder:text-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
          <div className="absolute top-1/2 right-4 -translate-y-1/2">
            <Search className="size-5.5 text-slate-300" />
          </div>
        </div>

        <Select
          value={filters.role}
          onChange={(e) => onRoleFilter(e.target.value)}
          options={USER_ROLE_OPTIONS}
        />

        <Select
          value={pagination.size}
          onChange={(e) => setSize(e.target.value)}
          options={PAGE_SIZE_OPTIONS}
        />
      </div>
    </div>
  );
}
