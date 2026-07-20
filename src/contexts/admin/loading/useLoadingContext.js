import { useContext } from "react";
import { LoadingContext } from "./LoadingContext";

export const useLoadingContext = () => {
  const context = useContext(LoadingContext);

  if(!context){
    throw Error("useLoadingContext must be used within LoadingProvider");
  }

  return context
};
