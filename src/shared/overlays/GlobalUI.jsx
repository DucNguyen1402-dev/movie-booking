import { DualRingLoading, ModalShell, Toast } from "@shared/overlays";

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
