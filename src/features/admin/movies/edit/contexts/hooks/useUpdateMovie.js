import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateMovie } from "@features/admin/movies/edit/api";

export function useUpdateMovie() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["movies"],
      });
    },
  });
}
