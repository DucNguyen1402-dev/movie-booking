import { useProfileActions, useProfileEffect, useProfileForm } from "./hooks";
import { ProfileContext } from "./ProfileContext";

const ProfileProvider = ({ children }) => {
  const { register, handleSubmit, getValues, reset, errors, isDirty } =
    useProfileForm();

  const {
    isLoading,
    onCancelPasswordChangeClick,
    onPasswordSubmitEvent,
    onSubmitEvent,
    loginedUser,
  } = useProfileActions({ handleSubmit, getValues, isDirty });

  useProfileEffect({ reset, loginedUser });

  const value = {
    form: { register, errors, isDirty, onSubmitEvent, onPasswordSubmitEvent },
    profile: { isLoading, onCancelPasswordChangeClick, loginedUser },
  };
  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export default ProfileProvider;
