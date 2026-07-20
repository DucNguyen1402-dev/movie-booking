import { Route } from "react-router-dom";
import ProfileLayout from "@features/admin/profile/layouts/ProfileLayout";
import { ProfileEdit, PasswordChange, ProfileView } from "@features/admin/profile/pages";

export const profileRoutes = (
  <Route path="profile" element={<ProfileLayout />}>
    <Route index element={<ProfileView />} />
    <Route path="edit" element={<ProfileEdit />} />
    <Route path="password" element={<PasswordChange />} />
  </Route>
);
