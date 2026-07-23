import { useQuery } from "@tanstack/react-query";

import { getUsers } from "@features/admin/users/contexts/api";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
}
