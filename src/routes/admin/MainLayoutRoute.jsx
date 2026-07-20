import { LayoutProvider } from "@contexts/admin/layout";
import { MainLayout } from "@layouts/admin";

const MainLayoutRoute = () => {
  return (
    <LayoutProvider>
      <MainLayout />
    </LayoutProvider>
  );
};

export default MainLayoutRoute;
