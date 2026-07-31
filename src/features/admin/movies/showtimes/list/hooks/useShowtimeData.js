import { useQuery } from "@tanstack/react-query";

import { getShowtimeData } from "@features/admin/movies/showtimes/list/api";

export function useShowtimeData({ movieId }) {
  return useQuery({
    queryFn: () => getShowtimeData(movieId),
    queryKey: ["showtimeData", movieId],
    enabled: !!movieId,
  });
}
