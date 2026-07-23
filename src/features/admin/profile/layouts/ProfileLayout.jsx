import { Outlet } from "react-router-dom";

import { ProfileProvider } from "@features/admin/profile/contexts";


export default function ProfileLayout() {
  return (
    <ProfileProvider>
      <Outlet />
    </ProfileProvider>
  );
}

