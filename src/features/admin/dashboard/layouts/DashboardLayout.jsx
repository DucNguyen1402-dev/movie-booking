import { Outlet } from "react-router-dom";

import { DashboardProvider } from "@features/admin/dashboard/contexts";
import { ScrollToTop } from "@components/admin/common";

const DashboardLayout = () => {
  return (
    <DashboardProvider>
      <ScrollToTop />
      <Outlet />
    </DashboardProvider>
  );
};

export default DashboardLayout;
