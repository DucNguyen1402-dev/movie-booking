import { Route } from "react-router-dom";

import { ProfileEdit } from "@features/admin/profile/edit";
import { ProfileLayout } from "@features/admin/profile/layouts";
import { ProfileView } from "@features/admin/profile/overview";
import { PasswordChange } from "@features/admin/profile/password-change";

export const profileRoutes = (
  <Route path="profile" element={<ProfileLayout />}>
    <Route index element={<ProfileView />} />
    <Route path="edit" element={<ProfileEdit />} />
    <Route path="password" element={<PasswordChange />} />
  </Route>
);
