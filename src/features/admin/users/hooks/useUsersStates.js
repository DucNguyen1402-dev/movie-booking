import { useUsers } from "@hooks/admin/useUsers";

export function useUsersStates() {
  const { data: users = [], isFetching, isPending } = useUsers();

  return {
    users,
    isFetching,
    isPending,
  };
}
