import { usePagination } from "@hooks/admin";

import { dashboardContext } from "./dashboardContext";
import {
  useDashboardData,
  useDashboardDerived,
  useRevenueRanking,
} from "./hooks";

export function DashboardProvider({ children }) {
  const { isPending, users, movies } = useDashboardData();

  const dashboardDerived = useDashboardDerived({ movies });

  const revenueRanking = useRevenueRanking({
    movies: dashboardDerived.derivedMovies?.dashboard,
  });

  const pagination = usePagination({
    items: revenueRanking.filteredMovies,
    resetDeps: [revenueRanking.params.keyword, revenueRanking.params.sortDesc],
  });

  const value = {
    users,
    movies,
    dashboardDerived,
    revenueRanking,
    pagination,
    isPending,
  };
  return (
    <dashboardContext.Provider value={value}>
      {children}
    </dashboardContext.Provider>
  );
}
