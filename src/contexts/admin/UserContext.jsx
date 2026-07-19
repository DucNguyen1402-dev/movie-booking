import { createContext, useContext, useState } from "react";
import { getCurrentUser, saveCurrentUser } from "@utils/shared";
import { useEffect } from "react";
import { avatarList } from "@config/admin";
import { getAvatarInitial } from "@utils/admin";

const userContext = createContext(null);

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [avatarIndex, setAvatarIndex] = useState(null);

  const avatarName = getAvatarInitial(currentUser.hoTen);

  useEffect(() => {
    if (avatarIndex === null) return;
    const newUser = {
      ...currentUser,
      avatarIndex,
    };
    saveCurrentUser(newUser);
    setCurrentUser(newUser);
  }, [avatarIndex]);

  const storageAvatarIndex = currentUser?.avatarIndex ?? null;
  const storageAvatar =
    storageAvatarIndex !== null ? avatarList[storageAvatarIndex] : null;

  const value = {
    currentUser,
    avatarIndex,
    setAvatarIndex,
    avatarList,
    avatarName,
    storageAvatar,
    account: currentUser.taiKhoan
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
