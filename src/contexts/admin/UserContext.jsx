import { createContext, useContext, useState } from "react";
import { getCurrentUser, saveCurrentUser } from "@utils/shared";
import { useEffect } from "react";
import {
  avatar01,
  avatar02,
  avatar03,
  avatar04,
  avatar05,
  avatar07,
  avatar08,
} from "@images/admin";

const userContext = createContext(null);

export function UserProvider({ children }) {
  const currentUser = getCurrentUser();

  const avatarList = [
    avatar01,
    avatar02,
    avatar03,
    avatar04,
    avatar05,
    avatar07,
    avatar08,
  ];
const [avatarIndex, setAvatarIndex] = useState(null);

  useEffect(() => {
    if (!avatarIndex) return;
    saveCurrentUser({
      ...currentUser,
      avatarIndex,
    });
  }, [avatarIndex]);

  const storageAvatarIndex= currentUser?.avatarIndex ?? null;

  const value = {
    currentUser,
    avatarIndex,
    setAvatarIndex,
    avatarList,
    avatarName: currentUser.hoTen.trim().split(/\s+/).at(-1)[0].toUpperCase(),
    storageAvatar: storageAvatarIndex ? avatarList[storageAvatarIndex]: null
  };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
}

export function useUserContext() {
  const context = useContext(userContext);

  if (!context) {
    throw new Error("userUserContext must be used in UserProvider");
  }

  return context;
}
