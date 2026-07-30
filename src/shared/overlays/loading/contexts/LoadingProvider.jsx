import { useCallback, useMemo, useState } from "react";

import { LoadingContext } from "./LoadingContext";

const LoadingProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const show = useCallback(() => setIsVisible(true), []);
  const hide = useCallback(() => setIsVisible(false), []);

  const value = useMemo(
    () => ({
      isVisible,
      show,
      hide,
    }),
    [isVisible, show, hide],
  );

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};

export default LoadingProvider;
