import { Outlet } from "react-router-dom";

import { ScrollToTop } from "@shared/navigation";

import { DashboardProvider } from "@features/admin/dashboard/contexts";

const DashboardLayout = () => {
  return (
    <DashboardProvider>
      <ScrollToTop />
      <Outlet />
    </DashboardProvider>
  );
};

export default DashboardLayout;
