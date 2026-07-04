import { useQuery } from "@tanstack/react-query";
import {getUsers} from "@services/admin/api"


export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
}