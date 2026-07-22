import { Route } from "react-router-dom";
import UsersLayout from "@features/admin/users/layouts/UsersLayout";
import {UsersManagement} from "@features/admin/users/management"
import { AddUser } from "@features/admin/users/add";
import { EditUser } from "@features/admin/users/edit";
import {  UserBookingInfor } from "@features/admin/users/booking-infor";

export const usersRoutes = (
  <Route path="users" element={<UsersLayout />}>
    <Route index element={<UsersManagement />} />
    <Route path="add" element={<AddUser />} />
    <Route path="edit/:account" element={<EditUser />} />
    <Route path="booking-infor/:account" element={<UserBookingInfor />} />
  </Route>
);
