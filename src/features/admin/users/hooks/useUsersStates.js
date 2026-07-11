import { useUsers } from "@hooks/admin/useUsers";
import { useEffect, useState } from "react";

export function useUsersStates() {
  const [users, setUsers] = useState([]);

  const { data: userData = [], isPending } = useUsers();

  useEffect(() => {
    if (!userData) return;
    setUsers(userData);
  }, [userData]);

  return {
    users,
    isPending,
  };
}
