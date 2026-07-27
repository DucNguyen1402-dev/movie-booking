import { PAGE_SIZE_OPTIONS, USER_ROLE_OPTIONS } from "@config/admin";
import { Search } from "lucide-react";

import { useUsersContext } from "@features/admin/users/contexts";
import { Input, Select } from "@components/admin/ui/form";

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
            inputClassName="bg-slate-950/50"
          />
        </div>

        <Select
          value={filters.role}
          onChange={(e) => onRoleFilter(e.target.value)}
          options={USER_ROLE_OPTIONS}
        />

        <Select
          value={pagination.currentSize}
          onChange={(e) => pagination.setSize(e.target.value)}
          options={PAGE_SIZE_OPTIONS}
        />
      </div>
    </div>
  );
};

export default UserToolbar;
