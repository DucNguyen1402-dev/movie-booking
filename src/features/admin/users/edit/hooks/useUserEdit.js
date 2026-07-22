import { updateUser } from "@features/admin/users/edit/api";
import { useQueryClient, useMutation } from "@tanstack/react-query";


export function useUserEdit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
}
