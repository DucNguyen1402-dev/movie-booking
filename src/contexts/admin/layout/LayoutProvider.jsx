import { useState } from "react";

import { LayoutContext } from "./LayoutContext";

export function LayoutProvider({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <LayoutContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}
