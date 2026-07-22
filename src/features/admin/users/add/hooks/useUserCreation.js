import { useQueryClient, useMutation } from "@tanstack/react-query";
import {createUser} from "@features/admin/users/add/api"

export function useUserCreation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
}
