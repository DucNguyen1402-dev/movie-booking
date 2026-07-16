import { useUsers } from "@hooks/admin/useUsers";
import { getUserData } from "@services/admin/api";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export function useStatisticsPrefetch() {
  const queryClient = useQueryClient();
  const { data: users = [] } = useUsers();

  useEffect(() => {
    if (!users.length) return;

    const prefetch = async () => {
      await queryClient.prefetchQuery({
        queryKey: ["statistics", "accountInfor"],
        queryFn: async () => {
          return Promise.all(
            users.map((user) => getUserData(user.taiKhoan))
          );
        },
      });
    };

    prefetch();
  }, [users, queryClient]);
}