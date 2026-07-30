import { DualRingLoading, ModalShell } from "@shared/overlays";
import { Toast } from "@shared/toast";

const GlobalUI = () => {
  return (
    <>
      {/* Overlay */}
      <DualRingLoading />
      <ModalShell />

      {/* Notifications */}
      <Toast />
    </>
  );
};

export default GlobalUI;
