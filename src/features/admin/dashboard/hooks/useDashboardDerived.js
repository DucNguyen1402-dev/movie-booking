import { useMemo } from "react";
import { buildDashboardData, buildDashboardRanking } from "../mocks";

export function useDashboardDerived({ movies }) {

  return useMemo(() => {
    const nowShowingMovies = movies.filter((movie) => movie.dangChieu);
    const upcomingMovies = movies.filter((movie) => movie.sapChieu);

    const dashboardMovies = buildDashboardData(nowShowingMovies);

    const moviesOver100B = dashboardMovies.filter(
      (movie) => movie.revenue >= 100_000_000_000,
    );
    const moviesOver50B = dashboardMovies.filter(
      (movie) => movie.revenue >= 50_000_000_000,
    );

    const dashboardRankings = buildDashboardRanking(dashboardMovies);
    const movieCount = dashboardMovies.length;

    const stats = dashboardMovies.reduce(
      (acc, movie) => {
        acc.totalRevenue += movie.revenue;
        acc.totalTicketSold += movie.ticketSold;
        acc.totalRating += movie.danhGia;

        if (
          !acc.topRevenueMovie ||
          movie.revenue > acc.topRevenueMovie.revenue
        ) {
          acc.topRevenueMovie = movie;
        }

        return acc;
      },
      {
        totalRevenue: 0,
        totalTicketSold: 0,
        totalRating: 0,
        topRevenueMovie: null,
      },
    );

    const averageRevenue = movieCount ? stats.totalRevenue / movieCount : 0;

    const averageTicketsSold = movieCount
      ? stats.totalTicketSold / movieCount
      : 0;

    const averageRating = movieCount ? stats.totalRating / movieCount : 0;

    const topRevenueMovies = [...dashboardMovies]
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    return {
      derivedMovies: {
        nowShowing: nowShowingMovies,
        upcoming: upcomingMovies,
        total: movies.length,
        dashboard: dashboardMovies,
      },

      revenue: {
        total: stats.totalRevenue,
        average: averageRevenue,
        top: stats.topRevenueMovie.revenue,
        topMovie: stats.topRevenueMovie,
        topMovies: topRevenueMovies,
        over100Quantity: moviesOver100B.length,
        over50BQuantity: moviesOver50B.length,
      },

      tickets: {
        total: stats.totalTicketSold,
        average: averageTicketsSold,
      },

      rating: {
        average: averageRating,
      },

      rankings: dashboardRankings,
    };
  }, [movies]);
}
