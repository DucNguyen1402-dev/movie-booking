import { createContext, useContext } from "react";
import { useTrailer } from "../hooks/useTrailer";

const trailerContext = createContext(null);

export function TrailerProvider({ children }) {
  const trailer = useTrailer();

  return (
    <trailerContext.Provider value={trailer}>
      {children}
    </trailerContext.Provider>
  );
}

export function useTrailerContext() {
  const context = useContext(trailerContext);

  if (!context) {
    throw new Error("useTrailerContext must be used within TrailerProvider");
  }

  return context;
}
