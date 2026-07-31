import { auth } from "@features/admin/auth";
import { useUsers } from "@features/admin/users/contexts/hooks";

export function useManageUsers() {
  const { data: users = [], isFetching, isPending, isSuccess } = useUsers();
  const { account } = auth.use();

  const visibleUsers = users.filter((user) => user.taiKhoan !== account);
  return {
    visibleUsers,
    isFetching,
    isPending,
    isSuccess,
  };
}
