import { getUserInfor } from "@features/admin/users/booking-infor/api";
import { useQuery } from "@tanstack/react-query";

export function useUserInfor(account) {
  return useQuery({
    queryFn: () => getUserInfor(account),
    queryKey: ["userInfor", account],
    enabled: !!account,
  });
}
