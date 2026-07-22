import {dashboardContext} from "./dashboardContext"

import {
  useDashboardDerived,
  useDashboardData,
  useRevenueRankingFilter,
} from "./hooks";
import { usePagination } from "@hooks/admin";


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
