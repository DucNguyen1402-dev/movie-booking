import { useContext, createContext } from "react";
import { useUsersStates } from "../hooks/useUsersStates";
import {useUsersActions} from "../hooks/useUsersActions";
import {useUserFilter} from "../hooks/useUserFilter"

const usersContext = createContext(null);

export function UsersProvider({ children }) {
  const usersStates = useUsersStates();
  const usersActions = useUsersActions();
  const userFilters = useUserFilter({users: usersStates.users});

  const value = {
    usersStates,
    userFilters,
    usersActions
  };

  return (
    <usersContext.Provider value={value}>{children}</usersContext.Provider>
  );
}

export function useUsersContext() {
  const context = useContext(usersContext);

  if (!context) {
    throw new Error("useEditMovie must be used within EditProvider");
  }
  return context;
}
