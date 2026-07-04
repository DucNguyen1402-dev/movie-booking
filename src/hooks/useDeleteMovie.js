
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMovie } from "@services/admin/api";

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