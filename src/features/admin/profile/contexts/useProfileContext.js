import { useContext } from "react";

import { ProfileContext } from "./ProfileContext";

export function useProfileContext() {
  const context = useContext(ProfileContext);

  if (!context) {
    throw Error("useProfileContext can only be used in ProfileProvider!");
  }

  return context;
}
