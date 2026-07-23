import { useQuery } from "@tanstack/react-query";

import { getCinemaClusters } from "@features/admin/movies/showtimes/create/api";

export function useCinemaClusters(system) {
  return useQuery({
    queryKey: ["cinema-clusters", system],
    queryFn: () => getCinemaClusters(system),
    enabled: !!system,
    staleTime: 1000 * 60 * 10, 
  });
}
