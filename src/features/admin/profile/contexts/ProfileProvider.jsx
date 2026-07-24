import { useProfile } from "./hooks";
import { ProfileContext } from "./ProfileContext";

export function ProfileProvider({ children }) {
  const { form, profile } = useProfile();

  const value = {
    form,
    profile,
  };
  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}
