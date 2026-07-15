import UserHeader from "@features/admin/users/components/users-management/UserHeader";
import UserToolbar from "@features/admin/users/components/users-management/UserToolbar";

import UserTable from "@features/admin/users/components/users-management/UserTable/UserTable";
import { useNotification } from "@contexts/admin/NotificationContext";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function usersManagement() {
  const location = useLocation();
  const { notifActions } = useNotification();

  useEffect(() => {
    if (location.state?.notification) {
      notifActions.showNotification(location.state.notification);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen space-y-6 bg-linear-to-br from-slate-950 to-slate-900 p-8">
      <UserHeader />

      <UserToolbar />

      <UserTable />
    </div>
  );
}
