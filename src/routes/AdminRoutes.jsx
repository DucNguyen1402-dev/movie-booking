import { Route, Routes, Navigate } from "react-router-dom";

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
import UserBookingInfor from "../pages/admin/Users/UserBookingInfor";
import { EditProvider } from "@features/admin/movies-management/edit/contexts/EditContext";
import { NotificationProvider } from "@contexts/admin/NotificationContext";
import { LoadingProvider } from "@contexts/admin/LoadingSpinnerContext";
import { ModalProvider } from "@contexts/admin/ModalContext";
import { UsersLayout, MoviesLayout, MainLayout } from "../layouts/admin";

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

              <Route path="movies" element={<MoviesLayout />}>
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
                <Route
                  path="booking-infor/:account"
                  element={<UserBookingInfor />}
                />
              </Route>
            </Route>
          </Routes>
        </NotificationProvider>
      </LoadingProvider>
    </ModalProvider>
  );
}
