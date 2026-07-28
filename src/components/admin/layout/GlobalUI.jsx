import { AnimatePresence, motion } from "motion/react";

import {
  useLoadingContext,
  useModalContext,
  useNotificationContext,
} from "@contexts/admin";
import { useLockBodyScroll } from "@hooks/admin";
import { ModalContainer } from "@components/admin/common";
import { Backdrop, DualRingSpinner, Notification } from "@components/admin/ui";

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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Backdrop>
              <ModalContainer />
            </Backdrop>
          </motion.div>
        )}

        {notification.isOpen && (
          <motion.div
            key="notification"
            className="pointer-events-none fixed inset-0 z-80 flex w-full max-w-md items-start justify-center px-4 pt-10 lg:max-w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Notification
              notificationRef={notification.ref}
              message={notification.message}
              variant={notification.variant}
            />
          </motion.div>
        )}
        {loading.isVisible && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Backdrop>
              <DualRingSpinner color="primary" />
            </Backdrop>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GlobalUI;
