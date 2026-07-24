import { useCallback, useMemo, useState } from "react";

import { LoadingContext } from "./LoadingContext";

export const LoadingProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const showLoading = useCallback(() => setIsVisible(true), []);
  const hideLoading = useCallback(() => setIsVisible(false), []);

  const value = useMemo(
    () => ({
      isVisible,
      showLoading,
      hideLoading,
    }),
    [isVisible, showLoading, hideLoading],
  );

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};
