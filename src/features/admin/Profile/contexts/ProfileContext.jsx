import { useProfileForm } from "../hooks";
import { createContext, useContext } from "react";

const profileContext = createContext(null);

export function ProfileProvider({ children }) {
  const profileForm = useProfileForm();

  const value = {
    profileForm,
    isLoading: profileForm.isLoading,
  };
  return (
    <profileContext.Provider value={value}>{children}</profileContext.Provider>
  );
}

export function useProfileContext() {
  const context = useContext(profileContext);

  if (!context) {
    throw Error("useProfileContext can only be used in ProfileProvider!");
  }

  return context;
}
