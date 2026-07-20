import { LayoutProvider } from "@contexts/admin";
import { MainLayout } from "@layouts/admin";

const MainLayoutRoute = () => {
  return (
    <LayoutProvider>
      <MainLayout />
    </LayoutProvider>
  );
};

export default MainLayoutRoute;
