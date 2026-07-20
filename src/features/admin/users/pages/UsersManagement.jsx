import UserHeader from "@features/admin/users/components/users-management/UserHeader";
import UserToolbar from "@features/admin/users/components/users-management/UserToolbar";

import UserTable from "@features/admin/users/components/users-management/UserTable/UserTable";
import { useNotification } from "@contexts/admin/NotificationContext";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLayoutContext } from "@contexts/admin/layout";

export default function usersManagement() {
  const { isSidebarOpen } = useLayoutContext();

  const location = useLocation();
  const { notifActions } = useNotification();

  useEffect(() => {
    if (location.state?.notification) {
      notifActions.showNotification(location.state.notification);
    }
  }, [location.state]);

  return (
    <div
      className={`min-h-screen p-8 bg-linear-to-br from-slate-900 to-slate-800 `}
    >
      <div className={`mx-auto space-y-8  transition-[max-width] duration-300 ease-in-out ${isSidebarOpen ? "max-w-full 2xl:max-w-380" : "max-w-6xl 2xl:max-w-7xl 3xl:max-w-380"}`}>
        <UserHeader />

        <UserToolbar />

        <div className="mt-16">
          <UserTable />
        </div>
      </div>
    </div>
  );
}
