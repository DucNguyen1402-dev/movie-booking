import { FileClock } from "lucide-react";

import { useLayoutContext } from "@contexts/admin";
import { useDashboardContext } from "@features/admin/dashboard/contexts";
import {
  HighestRevenueMovieCard,
  MetricsSection,
  MovieStatusCard,
  TopFiveRevenueMovies,
} from "@features/admin/dashboard/overview/components";

function Dashboard() {
  const {
    isPending,
    users,
    dashboardDerived: { derivedMovies, revenue, tickets, rating, ranking },
  } = useDashboardContext();
  const { isSidebarOpen } = useLayoutContext();

  return (
    <div
      className={`space-y-8 overflow-y-auto p-8 transition-[max-width] duration-300 ease-in-out ${isSidebarOpen ? "mx-auto max-w-full 2xl:max-w-360" : "mx-auto max-w-360"}`}
    >
      <div className="mx-auto w-fit space-y-4 text-center">
        <h1 className="text-3xl font-bold text-white">Tổng quan hệ thống</h1>
        <p className="mt-1 flex items-center gap-2 text-sm text-gray-400">
          <FileClock className="size-6 text-blue-500" />
          <span>Cập nhật dữ liệu thời gian thực của rạp phim.</span>
        </p>
      </div>

      <MetricsSection
        isPending={isPending}
        userQuantity={users.length}
        totalRevenue={revenue.total}
        totalTicketSold={tickets.total}
        averageRevenue={revenue.average}
        averageTicketsSold={tickets.average}
        averageRating={rating.average}
      />

      <MovieStatusCard
        isPending={isPending}
        nowShowingMovies={derivedMovies.nowShowing}
        upcomingMovies={derivedMovies.upcoming}
      />
      <HighestRevenueMovieCard
        isPending={isPending}
        highestRevenueMovie={ranking.highestRevenueMovie}
      />
      <TopFiveRevenueMovies
        isPending={isPending}
        topFiveMoviesRevenue={ranking.topFive}
      />
    </div>
  );
}

export default Dashboard;
