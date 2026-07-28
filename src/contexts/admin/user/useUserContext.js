import { useContext } from "react";

import { UserContext } from ".";

export function useUserContext() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("userUserContext must be used in UserProvider");
  }

  return context;
}
