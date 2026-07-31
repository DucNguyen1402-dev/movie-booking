import { useMemo, useState } from "react";

import { getAvatarInitial } from "@shared/utils";
import { getCurrentUser, saveCurrentUser } from "@shared/utils";

import { avatarList } from "@features/admin/auth/config";

import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
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
      currentAvatarIndex: currentUser.avatarIndex,
    }),
    [currentUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
