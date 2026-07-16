import { getUserData } from "@services/admin/api";


export function useStatistic() {
  const { data: accountInforList, isPending } = useQuery({
    queryKey: ["statistics", "accountInfor"],
    queryFn: async () => {
      return Promise.all(users.map((user) => getUserData(user.taiKhoan)));
    },
  });

  return {
    accountInforList,
    isPending,
  };
}
