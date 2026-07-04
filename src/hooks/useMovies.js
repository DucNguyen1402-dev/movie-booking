import { useQuery } from "@tanstack/react-query";
import {getMovies} from "@services/admin/api"

export function useMovies() {
  return useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });
}
