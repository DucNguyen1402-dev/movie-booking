import { Outlet } from "react-router-dom";

import { useLayoutContext } from "@contexts/admin/layout";
import GlobalUI from "@components/admin/GlobalUI";
import Header from "@components/admin/Header.jsx";
import Sidebar from "@components/admin/Sidebar.jsx";
import {
  SIDEBAR_COLLAPSED_OFFSET,
  SIDEBAR_CONTENT_OFFSET,
} from "@constants/admin";

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
