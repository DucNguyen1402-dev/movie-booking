import { createContext, useContext } from "react";
import { useDashboardDerived, useDashboardData } from "../hooks";

const dashboardContext = createContext(null);

export function DashboardProvider({ children }) {
  const { isPending, users, movies } = useDashboardData();

  const dashboardDerived = useDashboardDerived({ movies });

  const value = {
    isPending,
    users,
    movies,
    dashboardDerived,
  };
  return (
    <dashboardContext.Provider value={value}>
      {children}
    </dashboardContext.Provider>
  );
}

export function useDashboardContext() {
  const context = useContext(dashboardContext);

  if (!context) {
    throw error("useMovieContext must be used within MovieProvider");
  }

  return context;
}
