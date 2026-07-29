import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { notification } from "@shared/notification";

import { useLayoutContext } from "@contexts/admin";
import { useConsumeLocationState, useTemporaryState } from "@hooks/admin";
import {
  UserHeader,
  UserTable,
  UserToolbar,
} from "@features/admin/users/list/components";

const UsersList = () => {
  const { isSidebarOpen } = useLayoutContext();

  const location = useLocation();
  const [notificationState] = useTemporaryState(
    location.state?.notificationState,
  );
  useConsumeLocationState("notification");

  const notifier = notification.use();

  useEffect(() => {
    if (!notificationState) return;

    notifier.show(notificationState);
  }, [notifier, notificationState]);

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
};

export default UsersList;
