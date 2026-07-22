import { useMovies } from "@features/admin/movies-management";
import { useUsers } from "@features/admin/users";

export function useDashboardData() {
  const { data: movies = [] , isPending: isMoviesPending} = useMovies();
  const { data: users = [] ,isPending: isUsersPending} = useUsers();

  return {
    movies,
    users,
    isPending: isMoviesPending || isUsersPending
  };
}
