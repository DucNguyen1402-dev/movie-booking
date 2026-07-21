import { UsersProvider } from "@features/admin/users/contexts";
import {Outlet} from "react-router-dom"

export default function UsersLayout() {
  return (
    <UsersProvider>
      <Outlet />
    </UsersProvider>
  );
}