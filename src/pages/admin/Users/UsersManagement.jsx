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
    <div className="min-h-screen space-y-8 bg-linear-to-br from-slate-900 to-slate-800 p-8">
      <UserHeader />

      <UserToolbar />

     <div className ="mt-16">
       <UserTable />
     </div>
    </div>
  );
}
