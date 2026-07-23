import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addMovie } from "@features/admin/movies/add/api";

export function useAddMovie() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["movies"],
      });
    },
  });
}
