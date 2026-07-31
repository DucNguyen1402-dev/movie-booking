import { usePagination } from "@shared/table";

import { useManageUsers, useUserFilter, useUsersActions } from "./hooks";
import { usersContext } from "./usersContext";

const UsersProvider = ({ children }) => {
  const manageUsers = useManageUsers();
  const usersActions = useUsersActions();
  const userFilters = useUserFilter({ visibleUsers: manageUsers.visibleUsers });

  const pagination = usePagination({
    items: userFilters.filteredUsers,
    resetDeps: [
      userFilters.filters.keyword,
      userFilters.filters.role,
      // userFilters.filteredUsers,
    ],
    enabled: manageUsers.isSuccess,
  });

  const value = {
    manageUsers,
    userFilters,
    pagination,
    usersActions,
  };

  return (
    <usersContext.Provider value={value}>{children}</usersContext.Provider>
  );
};

export default UsersProvider;
