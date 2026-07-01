import { Route, Routes, Navigate } from "react-router-dom";

import MainLayout from "../layouts/admin/MainLayout";
import Dashboard from "../pages/admin/Dashboard/Dashboard";
import Profile from "../pages/admin/Profile/Profile";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes> 
  );
}