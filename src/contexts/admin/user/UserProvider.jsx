import { useMemo,useState } from "react";

import { avatarList } from "@config/admin";

import { getAvatarInitial } from "@utils/admin";
import { getCurrentUser, saveCurrentUser } from "@utils/shared";

import { userContext } from "./userContext";

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(getCurrentUser);

  const setAvatarIndex = (avatarIndex) => {
    setCurrentUser((prev) => {
      if (!prev) return prev;

      const newUser = {
        ...prev,
        avatarIndex,
      };

      saveCurrentUser(newUser);
      return newUser;
    });
  };

  const value = useMemo(
    () => ({
      setAvatarIndex,
      avatarList,
      avatarName: getAvatarInitial(currentUser?.hoTen),
      storageAvatar:
        currentUser?.avatarIndex != null
          ? avatarList[currentUser.avatarIndex]
          : null,
      account: currentUser?.taiKhoan,
    }),
    [currentUser],
  );

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
}
