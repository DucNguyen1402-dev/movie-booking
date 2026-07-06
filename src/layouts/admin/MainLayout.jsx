import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar.jsx";
import Header from "../../components/admin/Header.jsx";
import Modal from "@/components/admin/Modal/Modal";
import Notification from "@components/admin/Notification";
import { AnimatePresence, motion } from "motion/react";
import { useSelector } from "react-redux";
import {
  selectModalState,
} from "@features/admin/movie-management/redux/selectors";
import { useLockBodyScroll } from "@hooks/useLockBodyScroll";
import Backdrop from "@/components/admin/Backdrop";
import { useLogin } from "@hooks/useLogin";
import { useNotification } from "@hooks/useNotification";


function MainLayout() {
  useLogin();
  const { type: modalType } = useSelector(selectModalState);
  const isModalOpen = modalType !== null;
  useLockBodyScroll(isModalOpen);

  const notif = useNotification();

  return (
    <div className="flex min-h-screen bg-[#080707] font-sans text-gray-100">
      <Sidebar />

      <div className="ml-64 flex flex-1 flex-col">
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

          <AnimatePresence>
            {notif.isClosed && (
              <motion.div
                className="fixed inset-0 z-80 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Notification
                  ref={notif.ref}
                  styles={notif.styles}
                  Icon={notif.Icon}
                  message={notif.message}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
export default MainLayout;
