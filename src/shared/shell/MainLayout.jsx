import { Outlet } from "react-router-dom";

import { GlobalUI } from "@shared/overlays";
import { Header, Sidebar } from "@shared/shell";
import {
  SIDEBAR_COLLAPSED_OFFSET,
  SIDEBAR_CONTENT_OFFSET,
} from "@shared/shell/constants";

import { useLayoutContext } from "@contexts/admin";

function MainLayout() {
  const { isSidebarOpen } = useLayoutContext();
  return (
    <div className="flex min-h-screen bg-[#080707] font-sans text-gray-100">
      <Sidebar />

      <div
        className={`${isSidebarOpen ? SIDEBAR_CONTENT_OFFSET : SIDEBAR_COLLAPSED_OFFSET} flex flex-1 flex-col transition-[margin-left] duration-300 ease-in-out`}
      >
        <Header />
        <main className="flex-1">
          <Outlet />

          <GlobalUI />
        </main>
      </div>
    </div>
  );
}
export default MainLayout;
