import { useMemo, useState } from "react";

const applyFilters = (users, { keyword, role }) => {
  const search = keyword.trim().toLowerCase();

  return users.filter((user) => {
    const matchKeyword =
      !search ||
      user.taiKhoan.toLowerCase().includes(search) ||
      user.hoTen.toLowerCase().includes(search);

    const matchRole = role === "all" || user.maLoaiNguoiDung === role;

    return matchKeyword && matchRole;
  });
};

export function useUserFilter({ visibleUsers }) {
  const [filters, setFilters] = useState({
    keyword: "",
    role: "all",
  });

  const filteredUsers = useMemo(
    () => applyFilters(visibleUsers, filters),
    [visibleUsers, filters],
  );

  const onSearch = (value) =>
    setFilters((prev) => ({ ...prev, keyword: value }));

  const onRoleFilter = (value) =>
    setFilters((prev) => ({ ...prev, role: value }));

  const resetSearchFilter = () =>
    setFilters((prev) => ({ ...prev, keyword: "" }));

  return {
    filteredUsers,
    filters,
    onSearch,
    onRoleFilter,
    resetSearchFilter,
  };
}
