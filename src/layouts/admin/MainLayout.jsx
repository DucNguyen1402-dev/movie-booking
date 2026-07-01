import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";

import Header from "../components/Header.jsx";


function MainLayout() {
  return (
    <div className="flex min-h-screen bg-[#121212] text-gray-100 font-sans ">
      <Sidebar />

      <div className="flex-1 flex flex-col ml-64">
        <Header />

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
export default MainLayout;
