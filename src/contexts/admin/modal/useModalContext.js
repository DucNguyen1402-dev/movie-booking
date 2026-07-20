import { useContext } from "react";
import { modalContext } from "./ModalContext";

export function useModalContext() {
  const context = useContext(modalContext);

  if (!context) {
    throw new Error("useModalContext must be used within ModalProvider");
  }

  return context;
}
