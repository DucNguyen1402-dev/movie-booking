import { useMemo } from "react";
import { buildDashboardData } from "../mocks/buildDashboardData";

export function useDashboardDerived({ movies }) {
  return useMemo(() => {
    const nowShowingMovies = movies.filter((movie) => movie.dangChieu);
    const upcomingMovies = movies.filter((movie) => movie.sapChieu);

    const dashboardMovies = buildDashboardData(nowShowingMovies);
    const movieCount = dashboardMovies.length;

    const stats = dashboardMovies.reduce(
      (acc, movie) => {
        acc.totalRevenue += movie.revenue;
        acc.totalTicketSold += movie.ticketSold;
        acc.totalRating += movie.danhGia;

        if (!acc.topRevenueMovie || movie.revenue > acc.topRevenueMovie.revenue) {
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

    const averageRevenue = movieCount
      ? stats.totalRevenue / movieCount
      : 0;

    const averageTicketsSold = movieCount
      ? stats.totalTicketSold / movieCount
      : 0;

    const averageRating = movieCount
      ? stats.totalRating / movieCount
      : 0;

    const topRevenueMovies = [...dashboardMovies]
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    return {
      nowShowingMovies,
      upcomingMovies,

      totalRevenue: stats.totalRevenue,
      totalTicketSold: stats.totalTicketSold,
      averageRevenue,
      averageTicketsSold,
      averageRating,

      topRevenueMovie: stats.topRevenueMovie,
      topRevenueMovies,
    };
  }, [movies]);
}