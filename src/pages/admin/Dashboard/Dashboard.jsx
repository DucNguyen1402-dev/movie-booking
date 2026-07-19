import MetricsSection from "@features/admin/dashboard/components/MetricsSection.jsx";
import TopRevenueMovies from "@features/admin/dashboard/components/TopRevenueMovies.jsx";
import MovieStatusCard from "@features/admin/dashboard/components/MovieStatusCard.jsx";
import TopRevenueMovieCard from "@features/admin/dashboard/components/TopRevenueMovieCard.jsx";
import { FileClock } from "lucide-react";

import { useDashboardContext } from "@features/admin/dashboard/contexts/DashboardContext";

function Dashboard() {
  const {
    isPending,
    users,
    dashboardDerived: { derivedMovies, revenue, tickets, rating, ranking },
  } = useDashboardContext();

  return (
    <div className="flex flex-1 flex-col">
      {/* ========================================================= */}
      {/* 1. MAIN CONTENT CONTAINER                                 */}
      {/* ========================================================= */}
      <div className="flex-1 space-y-8 overflow-y-auto p-8">
        {/* Page Title */}
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
        <TopRevenueMovieCard
          isPending={isPending}
          highestRevenueMovie={ranking.highestRevenueMovie}
        />
        <TopRevenueMovies
          isPending={isPending}
          topFiveMoviesRevenue={ranking.topFive}
        />
      </div>
    </div>
  );
}

export default Dashboard;
