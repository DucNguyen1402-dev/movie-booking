import { useContext } from "react";
import { userContext } from "./userContext";

export function useUserContext() {
  const context = useContext(userContext);

  if (!context) {
    throw new Error("userUserContext must be used in UserProvider");
  }

  return context;
}
