import { Route, Routes, Navigate } from "react-router-dom";

import MainLayout from "../layouts/admin/MainLayout";
import Dashboard from "../pages/admin/Dashboard";
import Profile from "../pages/admin/Profile";
import MovieManagement from "../pages/admin/MovieManagement";
import EditMovie from "../pages/admin/EditMovie";
import AddMovie from "../pages/admin/AddMovie";
import { EditProvider } from "../features/admin/edit-movie/context/EditContext";
import { NotificationProvider } from "@contexts/admin/Notification/NotificationContext";

export default function AdminRoutes() {
  return (
    <NotificationProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />

          <Route path="movies">
            <Route index element={<MovieManagement />} />
            <Route
              path="edit/:id"
              element={
                <EditProvider>
                  <EditMovie />
                </EditProvider>
              }
            />
            <Route path="add" element={<AddMovie />} />
          </Route>
        </Route>
      </Routes>
    </NotificationProvider>
  );
}
