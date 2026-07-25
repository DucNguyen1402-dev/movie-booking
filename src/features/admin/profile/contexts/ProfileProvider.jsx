import { useProfile } from "./hooks";
import { ProfileContext } from "./ProfileContext";

const ProfileProvider = ({ children }) => {
  const { form, profile } = useProfile();

  const value = {
    form,
    profile,
  };
  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export default ProfileProvider;
