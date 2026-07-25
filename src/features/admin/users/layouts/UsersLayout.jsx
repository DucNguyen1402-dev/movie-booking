import { Outlet } from "react-router-dom";

import { UsersProvider } from "@features/admin/users/contexts";

const UsersLayout = () => {
  return (
    <UsersProvider>
      <Outlet />
    </UsersProvider>
  );
};

export default UsersLayout;
