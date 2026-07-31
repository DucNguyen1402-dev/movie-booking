import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateUser } from "@features/admin/users/edit";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userInfor"],
      });
    },
  });
}
