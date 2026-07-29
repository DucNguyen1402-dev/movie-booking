import { toast, ToastContainer } from "@shared/toast";
import { AnimatePresence, motion } from "motion/react";

const Toast = () => {
  const {
    state: { isOpen, message, variant, ref },
  } = toast.use();
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="notification"
          className="pointer-events-none fixed inset-0 z-80 flex w-full max-w-md items-start justify-center px-4 pt-10 lg:max-w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ToastContainer toastRef={ref} message={message} variant={variant} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
