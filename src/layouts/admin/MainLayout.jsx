import { Outlet } from "react-router-dom";
import Sidebar from "@components/admin/Sidebar.jsx";
import Header from "@components/admin/Header.jsx";
import GlobalUI from "@components/admin/globalUI";
import { useLogin } from "@hooks/useLogin";

function MainLayout() {
  useLogin();

  return (
    <div className="flex min-h-screen bg-[#080707] font-sans text-gray-100">
      <Sidebar />

      <div className="ml-64 flex flex-1 flex-col">
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
