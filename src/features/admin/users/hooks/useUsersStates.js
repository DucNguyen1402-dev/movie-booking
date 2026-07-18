import { useUsers } from "@hooks/admin/useUsers";

export function useUsersStates() {
  const { data: users = [], isFetching, isPending, isSucess} = useUsers();

  return {
    users,
    isFetching,
    isPending,
    isSucess
  };
}
