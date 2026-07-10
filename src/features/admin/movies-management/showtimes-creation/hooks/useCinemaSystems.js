import { useQuery } from "@tanstack/react-query";
import { getCinemaSystems } from "@services/admin/api";

export function useCinemaSystems() {
 return useQuery({
    queryKey: ["cinema-systems"],
    queryFn: getCinemaSystems,
      staleTime: 1000 * 60 * 10, 
  });
}
