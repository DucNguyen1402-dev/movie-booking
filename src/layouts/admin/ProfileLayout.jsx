import { ProfileProvider } from "@features/admin/profile/contexts";
import { Outlet } from "react-router-dom";


export default function ProfileLayout() {
  return (
    <ProfileProvider>
      <Outlet />
    </ProfileProvider>
  );
}

