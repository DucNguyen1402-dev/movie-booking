import { useQuery } from "@tanstack/react-query";
import { getCinemaClusters } from "@services/admin/api";

export function useCinemaClusters(system) {
  return useQuery({
    queryKey: ["cinema-clusters"],
    queryFn: () => getCinemaClusters(system),
    staleTime: 1000 * 60 * 10, 
  });
}
