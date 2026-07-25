import { useUsers } from "@features/admin/users/contexts/hooks";

export function useUsersStates() {
  const { data: users = [], isFetching, isPending, isSuccess } = useUsers();

  return {
    users,
    isFetching,
    isPending,
    isSuccess,
  };
}
