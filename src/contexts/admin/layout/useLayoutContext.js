import {  useContext } from "react";
import { LayoutContext } from "./LayoutContext";


export function useLayoutContext() {
  const context = useContext(LayoutContext);

  if (!context) {
    throw new Error(
      "useLayoutContext can only be used within a LayoutProvider!"
    );
  }

  return context;
}