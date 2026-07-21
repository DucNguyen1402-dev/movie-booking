import { useQuery } from "@tanstack/react-query";
import { getCinemaSystems } from "@features/admin/movies-management/showtimes-creation/services/api";

export function useCinemaSystems() {
 return useQuery({
    queryKey: ["cinema-systems"],
    queryFn: getCinemaSystems,
      staleTime: 1000 * 60 * 10, 
  });
}
