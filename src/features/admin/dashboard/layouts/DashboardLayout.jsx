import { Outlet } from "react-router-dom";

import { DashboardProvider } from "@features/admin/dashboard/contexts";
import ScrollToTop from "@components/admin/ScrollToTop";

export default function DashboardLayout() {
  return (
    <DashboardProvider>
      <ScrollToTop />
      <Outlet />
    </DashboardProvider>
  );
}
