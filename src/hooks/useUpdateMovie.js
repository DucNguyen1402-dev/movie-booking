import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMovie } from "@services/admin/api";

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
