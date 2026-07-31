import { Route } from "react-router-dom";

import DashboardLayout from "@features/admin/dashboard/layouts/DashboardLayout";
import { DashboardOverView } from "@features/admin/dashboard/overview/pages";
import { MovieRevenueRanking } from "@features/admin/dashboard/revenue-ranking/pages";

export const dashboardRoutes = (
  <Route path="dashboard" element={<DashboardLayout />}>
    <Route index element={<DashboardOverView />} />
    <Route path="revenue-ranking" element={<MovieRevenueRanking />} />
  </Route>
);
