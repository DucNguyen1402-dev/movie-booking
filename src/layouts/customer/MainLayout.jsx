import { Outlet } from "react-router-dom";
import Header from "@/components/customer/Header";
import Footer from "@/components/customer/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#0b1024] text-white">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}