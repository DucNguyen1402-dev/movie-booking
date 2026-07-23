import { MainLayout } from "@layouts/admin";

import { LayoutProvider } from "@contexts/admin/layout";

const MainLayoutRoute = () => {
  return (
    <LayoutProvider>
      <MainLayout />
    </LayoutProvider>
  );
};

export default MainLayoutRoute;
