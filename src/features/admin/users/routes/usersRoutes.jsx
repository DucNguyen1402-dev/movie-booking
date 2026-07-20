import { Route } from "react-router-dom";
import UsersLayout from "@features/admin/users/layouts/UsersLayout";
import {
  UsersManagement,
  AddUser,
  EditUser,
  UserBookingInfor,
} from "@pages/admin/Users";

export const usersRoutes = (
  <Route path="users" element={<UsersLayout />}>
    <Route index element={<UsersManagement />} />
    <Route path="add" element={<AddUser />} />
    <Route path="edit/:account" element={<EditUser />} />
    <Route path="booking-infor/:account" element={<UserBookingInfor />} />
  </Route>
);
