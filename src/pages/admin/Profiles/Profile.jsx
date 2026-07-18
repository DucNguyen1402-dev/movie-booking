import {
  ProfileHeader,
  ProfileForm,
  ProfileSkeleton,
} from "@features/admin/profile/components";
import { useProfileContext } from "@features/admin/profile/contexts";
import { useLocation } from "react-router-dom";
import { useNotification } from "@contexts/admin/NotificationContext";
import { useEffect } from "react";

import { getCurrentUser } from "@utils/shared";

export default function Profile() {
  const { isLoading } = useProfileContext();
  const currentUser = getCurrentUser();

  const location = useLocation();
  const { notifActions } = useNotification();

  useEffect(() => {
    if (location.state?.notification) {
      notifActions.showNotification(location.state.notification);
    }
  }, [location.state]);

  if (isLoading) return <ProfileSkeleton />;

  const userName = currentUser.hoTen;
  const avatarLetter = userName.charAt(0).toUpperCase() ?? "U";
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 to-slate-800 p-4 pb-20 antialiased ">
      <div className="flex items-center justify-center pt-10">
        <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-xl">
          <ProfileHeader name={currentUser.hoTen} avatarLetter={avatarLetter} />
          <ProfileForm />
        </div>
      </div>
    </div>
  );
}
