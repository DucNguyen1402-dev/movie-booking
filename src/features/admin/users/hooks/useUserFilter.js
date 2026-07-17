import { useState, useMemo } from "react";

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

export function useUserFilter({ users }) {
  const [filters, setFilters] = useState({
    keyword: "",
    role: "all",
  });

  const filteredUsers = useMemo(
    () => applyFilters(users, filters),
    [users, filters],
  );

  const onSearch = (keyword) => setFilters((prev) => ({ ...prev, keyword }));

  const onRoleFilter = (role) => setFilters((prev) => ({ ...prev, role }));

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
