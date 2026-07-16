import { DashboardProvider } from "@features/admin/dashboard/contexts/DashboardContext";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <DashboardProvider>
      <Outlet />
    </DashboardProvider>
  );
}
