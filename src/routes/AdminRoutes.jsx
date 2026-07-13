import { Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "../layouts/admin/MainLayout";
import Dashboard from "../pages/admin/Dashboard/Dashboard";
import Profile from "../pages/admin/Profiles/Profile";
import MovieManagement from "../pages/admin/Movies/MovieManagement";
import EditMovie from "../pages/admin/Movies/EditMovie";
import AddMovie from "../pages/admin/Movies/AddMovie";
import ShowtimeManagement from "../pages/admin/Movies/Showtime/ShowtimeManagement";
import ShowtimeCreation from "../pages/admin/Movies/Showtime/ShowtimeCreation";
import UsersManagement from "../pages/admin/Users/UsersManagement";
import AddUser from "../pages/admin/Users/AddUser";
import EditUser from "../pages/admin/Users/EditUser";
import { EditProvider } from "@features/admin/movies-management/edit/contexts/EditContext";
import { NotificationProvider } from "@contexts/admin/NotificationContext";
import { LoadingProvider } from "@contexts/admin/LoadingSpinnerContext";
import { ModalProvider } from "@contexts/admin/ModalContext";
import { TrailerProvider } from "@features/admin/movies-management/list/contexts/TrailerContext";
import UsersLayout from "../layouts/admin/UsersLayout";

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
                <Route path="showtimes/:id" element={<ShowtimeManagement />} />
                <Route
                  path="showtimes/:id/add"
                  element={<ShowtimeCreation />}
                />
              </Route>
              <Route path="users" element={<UsersLayout />}>
                <Route index element={<UsersManagement />} />
                <Route path="add" element={<AddUser />} />
                <Route path="edit/:account" element={<EditUser />} />
              </Route>
            </Route>
          </Routes>
        </NotificationProvider>
      </LoadingProvider>
    </ModalProvider>
  );
}
