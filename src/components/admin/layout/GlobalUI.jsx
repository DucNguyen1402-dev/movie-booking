import { DualRingLoading } from "@shared/loading";
import { Toast } from "@shared/toast";
import { AnimatePresence, motion } from "motion/react";

import { useModalContext } from "@contexts/admin";
import { useLockBodyScroll } from "@hooks/admin";
import { ModalContainer } from "@components/admin/common";
import { Backdrop } from "@components/admin/ui";

const GlobalUI = () => {
  const { modal } = useModalContext();

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
      </AnimatePresence>

      <Toast />
      <DualRingLoading />
    </>
  );
};

export default GlobalUI;
