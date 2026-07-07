import { useContext, createContext } from "react";
import {useModal} from "@hooks/useModal";

const modalContext = createContext(null);

export function ModalProvider({ children }) {
  
  const modal = useModal();

  return (
    <modalContext.Provider value={modal}>
      {children}
    </modalContext.Provider>
  );
}

export function useModalContext() {
  const context = useContext(modalContext);

  if (!context) {
    throw new Error("useEditMovie must be used within EditProvider");
  }

  return context;
}
