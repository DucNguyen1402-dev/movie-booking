import { useLoadingContext } from "@shared/overlays/loading/contexts";
import { AnimatePresence, motion } from "motion/react";

import { useLockBodyScroll } from "@hooks/admin";
import { Backdrop, DualRingSpinner } from "@components/admin/ui";

const DualRingLoading = () => {
  const { isVisible } = useLoadingContext();

  useLockBodyScroll(isVisible);
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Backdrop>
            <DualRingSpinner />
          </Backdrop>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DualRingLoading;
