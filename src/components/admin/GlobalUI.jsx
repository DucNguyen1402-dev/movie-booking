import { AnimatePresence, motion } from "motion/react";
import { useSelector } from "react-redux";
import Modal from "@/components/admin/Modal/Modal";
import Notification from "@components/admin/Notification";
import LoadingSpinner from "@components/admin/LoadingSpinner";
import Backdrop from "@/components/admin/Backdrop";
import {
  selectModalState,
} from "@features/admin/movie-management/redux/selectors";
import { useLockBodyScroll } from "@hooks/useLockBodyScroll";
import { useNotification } from "@contexts/admin/Notification/NotificationContext";
import {useLoading} from "@contexts/admin/LoadingSpinnerContext"

export default function GlobalUI() {
  const { type: modalType } = useSelector(selectModalState);
  const isModalOpen = modalType !== null;
  useLockBodyScroll(isModalOpen);

  const loading = useLoading();
  const notif = useNotification();
  return (
    <>
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
        {notif.isOpen && (
          <motion.div
            className="fixed inset-0 z-80 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Notification
              notificationRef={notif.notificationRef}
              styles={notif.styles}
              Icon={notif.Icon}
              message={notif.message}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {loading.isVisible && (
          <motion.div
            className="fixed inset-0 z-80 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <LoadingSpinner />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
