import { Outlet } from "react-router-dom";

import { layout } from "@shared/layouts";
import { Header, Sidebar } from "@shared/layouts/shell";
import {
  SIDEBAR_COLLAPSED_OFFSET,
  SIDEBAR_CONTENT_OFFSET,
} from "@shared/layouts/shell/sidebar";
import { GlobalUI } from "@shared/overlays";

function MainLayout() {
  const { isSidebarOpen } = layout.use();
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
