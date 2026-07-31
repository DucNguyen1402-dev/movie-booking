import { Outlet } from "react-router-dom";

import { ProfileProvider } from "@features/admin/profile/contexts";

const ProfileLayout = () => {
  return (
    <ProfileProvider>
      <Outlet />
    </ProfileProvider>
  );
};

export default ProfileLayout;
