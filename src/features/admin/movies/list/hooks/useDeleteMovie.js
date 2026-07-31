import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteMovie } from "@features/admin/movies/list/api";

export function useDeleteMovie() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["movies"],
      });
    },
  });
}
