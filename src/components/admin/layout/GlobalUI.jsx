import { AnimatePresence, motion } from "motion/react";

import {
  useLoadingContext,
  useModalContext,
  useNotificationContext,
} from "@contexts/admin";
import { useLockBodyScroll } from "@hooks/admin";
import { ModalContainer } from "@components/admin/common";
import { Backdrop, Loading, Notification } from "@components/admin/ui";

const GlobalUI = () => {
  const { modal } = useModalContext();
  const loading = useLoadingContext();
  const notification = useNotificationContext();

  const shouldLock = modal.type !== null || loading.isVisible;
  useLockBodyScroll(shouldLock);

  return (
    <>
      <AnimatePresence>
        {modal.type !== null && (
          <motion.div
            key="modal"
            className="fixed inset-0 z-80 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Backdrop />
            <ModalContainer />
          </motion.div>
        )}

        {notification.isOpen && (
          <motion.div
            key="notification"
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
        {loading.isVisible && (
          <motion.div
            key="loading"
            className="fixed inset-0 z-80 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Backdrop />
            <Loading />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GlobalUI;
