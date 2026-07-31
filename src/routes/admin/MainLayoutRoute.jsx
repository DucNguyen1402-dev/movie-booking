import { LayoutProvider, MainLayout } from "@shared/layouts";

const MainLayoutRoute = () => {
  return (
    <LayoutProvider>
      <MainLayout />
    </LayoutProvider>
  );
};

export default MainLayoutRoute;
