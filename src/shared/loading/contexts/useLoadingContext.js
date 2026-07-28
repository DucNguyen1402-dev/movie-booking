import { useContext } from "react";

import { LoadingContext } from "./LoadingContext";

const useLoadingContext = () => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error("[useLoadingContext] Missing <LoadingProvider>.");
  }

  return context;
};

export const loading = {
  use: useLoadingContext,
};
