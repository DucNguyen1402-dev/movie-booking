import { useContext } from "react";

import { dashboardContext } from "./dashboardContext";

export function useDashboardContext() {
  const context = useContext(dashboardContext);

  if (!context) {
    throw error("useDashboardContext must be used within DashboardProvider");
  }

  return context;
}
