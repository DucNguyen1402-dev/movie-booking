import { Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "../layouts/admin/MainLayout";
import Dashboard from "../pages/admin/Dashboard";
import Profile from "../pages/admin/Profile";
import MovieManagement from "../pages/admin/MovieManagement";
import EditMovie from "../pages/admin/EditMovie";
import AddMovie from "../pages/admin/AddMovie";
import { EditProvider } from "@features/admin/edit-movie/context/EditContext";
import { NotificationProvider } from "@contexts/admin/NotificationContext";
import { LoadingProvider } from "@contexts/admin/LoadingSpinnerContext";
import { ModalProvider } from "@contexts/admin/ModalContext";
import { TrailerProvider } from "@features/admin/movie-management/contexts/TrailerContext";

export default function AdminRoutes() {
  return (
    <ModalProvider>
      <LoadingProvider>
        <NotificationProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />

              <Route path="dashboard" element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />

              <Route path="movies">
                <Route
                  index
                  element={
                    <TrailerProvider>
                      <MovieManagement />
                    </TrailerProvider>
                  }
                />
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
      </LoadingProvider>
    </ModalProvider>
  );
}
