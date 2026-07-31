import { useEffect, useRef } from "react";

export function useScrollIntoView({
  ref,
  enabled,
  options = {
    behavior: "smooth",
    block: "center",
  },
}) {
  const hasScrolled = useRef(false);

  useEffect(() => {
    if (!enabled || hasScrolled.current) return;

    ref.current?.scrollIntoView(options);
    hasScrolled.current = true;
  }, [enabled, options, ref]);
}
