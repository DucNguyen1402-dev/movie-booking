import { Route } from "react-router-dom";
import {ProfileLayout} from "@features/admin/profile/layouts";
import { ProfileEdit} from "@features/admin/profile/edit";
import { PasswordChange } from "@features/admin/profile/password-change";
import {ProfileView } from "@features/admin/profile/overview";

export const profileRoutes = (
  <Route path="profile" element={<ProfileLayout />}>
    <Route index element={<ProfileView />} />
    <Route path="edit" element={<ProfileEdit />} />
    <Route path="password" element={<PasswordChange />} />
  </Route>
);
