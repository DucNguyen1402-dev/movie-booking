import { useLockBodyScroll } from "@shared/hooks";
import { Backdrop } from "@shared/overlays";
import { ModalContainer } from "@shared/overlays/modal/containers";
import { useModalContext } from "@shared/overlays/modal/contexts";
import { AnimatePresence, motion } from "motion/react";

const ModalShell = () => {
  const {
    internal: {
      state: { modalState },
    },
  } = useModalContext();

  useLockBodyScroll(modalState.isOpen);

  return (
    <AnimatePresence>
      {modalState.isOpen && (
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
  );
};

export default ModalShell;
