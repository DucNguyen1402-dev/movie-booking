import { useQuery } from "@tanstack/react-query";
import {getMovies} from "@features/admin/movies-management/services/api"

export function useMovies() {
  return useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });
}
