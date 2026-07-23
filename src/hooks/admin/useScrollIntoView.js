import { useEffect } from "react";

export function useScrollIntoView({
  ref,
  enabled,
  options = {
    behavior: "smooth",
    block: "center",
  },
}) {

  useEffect(() => {
    if (!enabled) return;

    ref.current?.scrollIntoView(options);
  }, [enabled, options]);
}
