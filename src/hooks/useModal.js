import { useState } from "react";

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);


  const openModal = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  
  return {
    open,
    close,
    isOpen
  };
}
