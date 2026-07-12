import { useUsers } from "@hooks/admin/useUsers";


export function useUsersStates() {
  const { data: users = [], isPending } = useUsers();


  return {
    users,
    isPending,
  };
}
