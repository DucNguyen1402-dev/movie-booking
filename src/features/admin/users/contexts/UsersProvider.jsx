import { usePagination } from "@hooks/admin";
import { useUsersStates, useUsersActions, useUserFilter } from "./hooks";
import { usersContext } from "./usersContext";

export function UsersProvider({ children }) {
  const usersStates = useUsersStates();
  const usersActions = useUsersActions();
  const userFilters = useUserFilter({ users: usersStates.users });

  const pagination = usePagination({
    items: userFilters.filteredUsers,
    resetDeps: [
      userFilters.filters.keyword,
      userFilters.filters.role,
      userFilters.filteredUsers,
    ],
    enabled: usersStates.isSucess,
  });

  const value = {
    usersStates,
    userFilters,
    pagination,
    usersActions,
  };

  return (
    <usersContext.Provider value={value}>{children}</usersContext.Provider>
  );
}
