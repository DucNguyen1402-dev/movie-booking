import { AnimatePresence, motion } from "motion/react";
import Modal from "@/components/admin/Modal/Modal";
import Notification from "@components/admin/Notification";
import LoadingSpinner from "@components/admin/LoadingSpinner";
import Backdrop from "@/components/admin/Backdrop";
import { useLockBodyScroll } from "@hooks/admin/useLockBodyScroll";
import { useNotificationContext } from "@contexts/admin/notification";
import {useLoadingContext} from "@contexts/admin/loading"
import {useModalContext} from "@contexts/admin/modal"

export default function GlobalUI() {
  const {modal} = useModalContext();
  const loading = useLoadingContext();
  const notification = useNotificationContext();
  
  const shouldLock = modal.type !== null || loading.isVisible;
  useLockBodyScroll(shouldLock);

  return (
    <>
      <AnimatePresence>
        {modal.type !== null && (
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
        {notification.isOpen && (
          <motion.div
            className="fixed inset-0 z-80 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Notification
              notificationRef={notification.notificationRef}
              styles={notification.ui.styles}
              Icon={notification.ui.Icon}
              message={notification.ui.message}
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
