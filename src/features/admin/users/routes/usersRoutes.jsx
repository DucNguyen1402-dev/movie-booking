import { Route } from "react-router-dom";

import { AddUser } from "@features/admin/users/add";
import {  UserBookingInfor } from "@features/admin/users/booking-infor";
import { EditUser } from "@features/admin/users/edit";
import UsersLayout from "@features/admin/users/layouts/UsersLayout";
import {UsersManagement} from "@features/admin/users/management"

export const usersRoutes = (
  <Route path="users" element={<UsersLayout />}>
    <Route index element={<UsersManagement />} />
    <Route path="add" element={<AddUser />} />
    <Route path="edit/:account" element={<EditUser />} />
    <Route path="booking-infor/:account" element={<UserBookingInfor />} />
  </Route>
);
