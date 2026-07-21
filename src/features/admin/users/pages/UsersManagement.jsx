import {
  UserTable,
  UserHeader,
  UserToolbar,
} from "@features/admin/users/management/components";

import { useNotificationContext } from "@contexts/admin/notification";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLayoutContext } from "@contexts/admin/layout";

export default function usersManagement() {
  const { isSidebarOpen } = useLayoutContext();

  const location = useLocation();
  const { notificationActions } = useNotificationContext();

  useEffect(() => {
    if (location.state?.notification) {
      notificationActions.show(location.state.notification);
    }
  }, [location.state]);

  return (
    <div
      className={`min-h-screen bg-linear-to-br from-slate-900 to-slate-800 p-8`}
    >
      <div
        className={`mx-auto space-y-8 transition-[max-width] duration-300 ease-in-out ${isSidebarOpen ? "max-w-full 2xl:max-w-380" : "3xl:max-w-380 max-w-6xl 2xl:max-w-7xl"}`}
      >
        <UserHeader />

        <UserToolbar />

        <div className="mt-16">
          <UserTable />
        </div>
      </div>
    </div>
  );
}
