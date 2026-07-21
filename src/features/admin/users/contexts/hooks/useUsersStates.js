import { useUsers } from "@features/admin/users/hooks";

export function useUsersStates() {
  const { data: users = [], isFetching, isPending, isSucess} = useUsers();

  return {
    users,
    isFetching,
    isPending,
    isSucess
  };
}
