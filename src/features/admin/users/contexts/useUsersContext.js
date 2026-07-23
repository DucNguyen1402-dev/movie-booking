import { useContext } from "react";

import {usersContext} from "./usersContext"

export function useUsersContext() {
  const context = useContext(usersContext);

  if (!context) {
    throw new Error("useUsersContext must be used within UserProvider");
  }
  return context;
}
