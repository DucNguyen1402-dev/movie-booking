import { Route, Routes, Navigate } from "react-router-dom";

import MainLayoutRoute from "./MainLayoutRoute";
import {
  UsersLayout,
  MoviesLayout,
  DashboardLayout,
  ProfileLayout,
} from "@layouts/admin";
import { Dashboard, RevenueRanking } from "@pages/admin/Dashboard";
import { ProfileEdit, PasswordChange, ProfileView } from "@pages/admin/Profile";
import EditMovieRoute from "./EditMovieRoute";
import {
  MovieManagement,
  AddMovie,
  ShowtimeManagement,
  ShowtimeCreation,
} from "@pages/admin/Movies";
import {
  UsersManagement,
  AddUser,
  EditUser,
  UserBookingInfor,
} from "@pages/admin/Users";

import { AdminProviders } from "@providers/admin";

export default function AdminRoutes() {
  return (
    <AdminProviders>
      <Routes>
        <Route path="/" element={<MainLayoutRoute />}>
          <Route index element={<Navigate to="dashboard" replace />} />

          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="revenue-ranking" element={<RevenueRanking />} />
          </Route>

          <Route path="profile" element={<ProfileLayout />}>
            <Route index element={<ProfileView />} />
            <Route path="edit" element={<ProfileEdit />} />
            <Route path="password" element={<PasswordChange />} />
          </Route>

          <Route path="movies" element={<MoviesLayout />}>
            <Route index element={<MovieManagement />} />
            <Route path="edit/:id" element={<EditMovieRoute />} />
            <Route path="add" element={<AddMovie />} />
            <Route path="showtimes/:id" element={<ShowtimeManagement />} />
            <Route path="showtimes/:id/add" element={<ShowtimeCreation />} />
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
    </AdminProviders>
  );
}
