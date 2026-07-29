import { DualRingLoading } from "@shared/loading";
import { notification } from "@shared/notification";
import { AnimatePresence, motion } from "motion/react";

import { useModalContext } from "@contexts/admin";
import { useLockBodyScroll } from "@hooks/admin";
import { ModalContainer } from "@components/admin/common";
import { Backdrop, Notification } from "@components/admin/ui";

const GlobalUI = () => {
  const { modal } = useModalContext();
  const { ui } = notification.use();

  const shouldLock = modal.type !== null;
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
              notificationRef={ui.ref}
              message={ui.message}
              variant={ui.variant}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <DualRingLoading />
    </>
  );
};

export default GlobalUI;
