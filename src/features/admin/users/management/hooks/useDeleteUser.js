import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteUser } from "@features/admin/users/management/api";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
}
