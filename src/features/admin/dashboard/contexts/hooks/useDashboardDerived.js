import { useMemo } from "react";

import { buildDashboardData } from "@features/admin/dashboard/contexts/mocks";

export function useDashboardDerived({ movies }) {
  const REVENUE_50B = 50_000_000_000;
  const REVENUE_100B = 100_000_000_000;

  return useMemo(() => {
    const derivedMovies = movies.reduce(
      (result, movie) => {
        if (movie.dangChieu) {
          result.nowShowing.push(movie);
        }

        if (movie.sapChieu) {
          result.upcoming.push(movie);
        }

        return result;
      },
      {
        nowShowing: [],
        upcoming: [],
        total: movies.length,
      },
    );

    derivedMovies.dashboard = buildDashboardData(derivedMovies.nowShowing);

    const revenueBuckets = derivedMovies.dashboard.reduce(
      (result, movie) => {
        if (movie.revenue >= REVENUE_100B) {
          result.over100B.push(movie);
        }

        if (movie.revenue >= REVENUE_50B) {
          result.over50B.push(movie);
        }

        return result;
      },
      {
        over100B: [],
        over50B: [],
      },
    );

    const rankingMovies = [...derivedMovies.dashboard].sort(
      (a, b) => b.revenue - a.revenue,
    );

    const ranking = {
      movies: rankingMovies,
      topFive: rankingMovies.slice(0, 5),
      rankMap: new Map(
        rankingMovies.map((movie, index) => [movie.maPhim, index + 1]),
      ),
      highestRevenueMovie: rankingMovies[0],
    };

    const dashboardStats = derivedMovies.dashboard.reduce(
      (result, movie) => {
        result.totalRevenue += movie.revenue;
        result.totalTicketSold += movie.ticketSold;
        result.totalRating += movie.danhGia;

        return result;
      },
      {
        totalRevenue: 0,
        totalTicketSold: 0,
        totalRating: 0,
        topRevenueMovie: null,
      },
    );

    const nowShowingMovieCount = derivedMovies.dashboard.length;

    const averages = Object.fromEntries(
      Object.entries({
        revenue: dashboardStats.totalRevenue,
        ticketSold: dashboardStats.totalTicketSold,
        rating: dashboardStats.totalRating,
      }).map(([key, total]) => [
        key,
        nowShowingMovieCount ? total / nowShowingMovieCount : 0,
      ]),
    );

    return {
      derivedMovies,
      revenue: {
        total: dashboardStats.totalRevenue,
        average: averages.revenue,
        buckets: revenueBuckets,
      },
      tickets: {
        total: dashboardStats.totalTicketSold,
        average: averages.ticketSold,
      },
      rating: {
        average: averages.rating,
      },

      ranking,
    };
  }, [movies]);
}
