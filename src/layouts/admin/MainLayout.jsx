import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar.jsx";
import Header from "../../components/admin/Header.jsx";
import Modal from "@/components/admin/Modal/Modal";
import { AnimatePresence, motion } from "motion/react";
import { useSelector } from "react-redux";
import { selectModalState } from "@features/admin/movie-management/redux/selectors";
import {useLockBodyScroll} from "@hooks/useLockBodyScroll"
import Backdrop from "@/components/admin/Backdrop";

function MainLayout() {

  const {type } = useSelector(selectModalState);
  const isModalOpen = type !== null;
  useLockBodyScroll(isModalOpen);

  return (
    <div className="flex min-h-screen bg-[#121212] text-gray-100 font-sans ">
      <Sidebar />

      <div className="flex-1 flex flex-col ml-64">
        <Header />

        <main className="flex-1">
          <Outlet />

          
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-80 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Backdrop />
            <Modal />
          </motion.div>
        )}
      </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
export default MainLayout;
