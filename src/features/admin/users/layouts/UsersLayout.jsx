import {Outlet} from "react-router-dom"

import { UsersProvider } from "@features/admin/users/contexts";

export default function UsersLayout() {
  return (
    <UsersProvider>
      <Outlet />
    </UsersProvider>
  );
}