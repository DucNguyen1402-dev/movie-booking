import { Route, Routes, Navigate } from "react-router-dom";
import { dashboardRoutes } from "@features/admin/dashboard/routes/dashboardRoutes";
import { movieRoutes } from "@features/admin/movies-management/routes/movieRoutes";
import { profileRoutes } from "@features/admin/profile/routes/profileRoutes";
import { usersRoutes } from "@features/admin/users/routes/usersRoutes";
import MainLayoutRoute from "./MainLayoutRoute";

import { AdminProviders } from "@providers/admin";

export default function AdminRoutes() {
  return (
    <AdminProviders>
      <Routes>
        <Route path="/" element={<MainLayoutRoute />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          {dashboardRoutes}
          {profileRoutes}
          {movieRoutes}
          {usersRoutes}
        </Route>
      </Routes>
    </AdminProviders>
  );
}
