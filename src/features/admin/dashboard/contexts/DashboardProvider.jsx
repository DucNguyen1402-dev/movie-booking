import { usePagination } from "@hooks/admin";

import {dashboardContext} from "./dashboardContext"
import {
  useDashboardData,
  useDashboardDerived,
  useRevenueRankingFilter,
} from "./hooks";



export function DashboardProvider({ children }) {
  const { isPending, users, movies } = useDashboardData();

  const dashboardDerived = useDashboardDerived({ movies });

  const revenueRankingFilter = useRevenueRankingFilter({
    movies: dashboardDerived.derivedMovies?.dashboard,
  });

  const pagination = usePagination({
    items: revenueRankingFilter.filteredMovies,
    resetDeps: [
      revenueRankingFilter.filter.keyword,
      revenueRankingFilter.filter.sortDesc,
    ],
  });
  const value = {
    users,
    movies,
    dashboardDerived,
    revenueRankingFilter,
    pagination,
    isPending
  };
  return (
    <dashboardContext.Provider value={value}>
      {children}
    </dashboardContext.Provider>
  );
}
