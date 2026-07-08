import { useQuery } from "@tanstack/react-query";
import { getCinemaClustersWithShowtimes} from "@services/admin/api";


export function useCinemaClustersWithShowtimes(system){
  return useQuery({
    queryKey: ["cinema-clusters-with-showtimes"],
    queryFn: () => getCinemaClustersWithShowtimes(system),
    staleTime: 1000 * 60 * 10, 
  });

}