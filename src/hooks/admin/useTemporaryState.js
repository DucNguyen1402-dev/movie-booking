import { useEffect, useState } from "react";
export function useTemporaryState(initialValue, duration = 2000) {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    if (state == null) return;

    const timer = setTimeout(() => {
      setState(null);
    }, duration);

    return () => clearTimeout(timer);
  }, [state, duration]);

  return [state];
}
