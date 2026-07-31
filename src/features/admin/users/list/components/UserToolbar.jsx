import { Input, Select } from "@shared/fields";
import { PaginationSelect } from "@shared/table";
import { Search } from "lucide-react";

import { USER_ROLE_OPTIONS } from "@features/admin/users/config";
import { useUsersContext } from "@features/admin/users/contexts";

const UserToolbar = () => {
  const {
    userFilters: { filters, onSearch, onRoleFilter },
    pagination,
  } = useUsersContext();

  return (
    <div className="overflow-hidden rounded-md">
      <div className="grid grid-cols-5 gap-3 rounded-md border border-slate-700 bg-slate-800 p-4 text-white">
        <div className="relative col-span-3">
          <Input
            value={filters.keyword}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Tìm theo tài khoản hoặc họ tên..."
            leftIcon={Search}
            inputClassName="bg-slate-950/40"
          />
        </div>

        <Select
          value={filters.role}
          onChange={(e) => onRoleFilter(e.target.value)}
          options={USER_ROLE_OPTIONS}
        />

        <PaginationSelect
          value={pagination.state.currentSize}
          onChange={(e) => pagination.actions.setSize(e.target.value)}
        />
      </div>
    </div>
  );
};

export default UserToolbar;
