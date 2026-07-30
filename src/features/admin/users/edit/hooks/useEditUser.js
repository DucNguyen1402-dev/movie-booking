import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateUser } from "@features/admin/users/edit/api";

export function useEditUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
}
