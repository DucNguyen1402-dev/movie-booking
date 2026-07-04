import { useEffect } from "react";

export function useLockBodyScroll(lock) {
  useEffect(() => {
    if (!lock) return;

    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [lock]);
}