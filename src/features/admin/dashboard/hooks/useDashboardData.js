import { useMovies } from "@features/admin/movies-management";
import { useUsers } from "@hooks/admin/useUsers.js";

export function useDashboardData() {
  const { data: movies = [] , isPending: isMoviesPending} = useMovies();
  const { data: users = [] ,isPending: isUsersPending} = useUsers();

  return {
    movies,
    users,
    isPending: isMoviesPending || isUsersPending
  };
}
