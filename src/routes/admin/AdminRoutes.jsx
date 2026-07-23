import { Navigate,Route, Routes } from "react-router-dom";

import { AdminProviders } from "@providers/admin";

import { dashboardRoutes } from "@features/admin/dashboard/routes/dashboardRoutes";
import { movieRoutes } from "@features/admin/movies/routes/movieRoutes";
import { profileRoutes } from "@features/admin/profile/routes/profileRoutes";
import { usersRoutes } from "@features/admin/users/routes/usersRoutes";

import MainLayoutRoute from "./MainLayoutRoute";

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
