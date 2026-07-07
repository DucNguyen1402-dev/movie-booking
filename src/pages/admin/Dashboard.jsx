import { useMovies } from "@hooks/admin/useMovies.js";
import { useUsers } from "@hooks/admin/useUsers.js";
import { useDashboardDerived } from "@features/admin/dashboard/hooks/useDashboardDerived";
import MetricsSection from "@features/admin/dashboard/components/MetricsSection.jsx";
import TopRevenueMovies from "@features/admin/dashboard/components/TopRevenueMovies.jsx";
import MovieStatusCard from "@features/admin/dashboard/components/MovieStatusCard.jsx";
import TopRevenueMovieCard from "@features/admin/dashboard/components/TopRevenueMovieCard.jsx";

 function Dashboard() {

  const { data: movies = [] } = useMovies();
  const { data: users = {} } = useUsers();

  const {
    nowShowingMovies,
    upcomingMovies,

    totalRevenue,
    totalTicketSold,
    averageRevenue,
    averageTicketsSold,
    averageRating,

    topRevenueMovie,
    topRevenueMovies,
  } = useDashboardDerived({ movies });

  return (
    <div className="flex flex-1 flex-col">
      {/* ========================================================= */}
      {/* 1. MAIN CONTENT CONTAINER                                 */}
      {/* ========================================================= */}
      <div className="flex-1 space-y-8 overflow-y-auto p-8">
        {/* Page Title */}
        <div className="mx-auto w-fit space-y-4 text-center">
          <h1 className="text-2xl font-bold text-white">Tổng quan hệ thống</h1>
          <p className="mt-1 text-sm text-gray-400">
            Cập nhật dữ liệu thời gian thực của rạp phim.
          </p>
        </div>

        <MetricsSection
          userQuantity={users.length}
          totalRevenue={totalRevenue}
          totalTicketSold={totalTicketSold}
          averageRevenue={averageRevenue}
          averageTicketsSold={averageTicketsSold}
          averageRating={averageRating}
        />

        <MovieStatusCard
          nowShowingMovies={nowShowingMovies}
          upcomingMovies={upcomingMovies}
        />
        <TopRevenueMovieCard topRevenueMovie={topRevenueMovie} />
        <TopRevenueMovies topRevenueMovies={topRevenueMovies} />
      </div>
    </div>
  );
}

export default Dashboard;
