import DashboardLayout from "@features/admin/dashboard/layouts/DashboardLayout";
import { Dashboard, RevenueRanking } from "@features/admin/dashboard/pages";
import { Route } from "react-router-dom";

export const dashboardRoutes = (
  <Route path="dashboard" element={<DashboardLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="revenue-ranking" element={<RevenueRanking />} />
  </Route>
);