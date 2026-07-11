import UserHeader from "@features/admin/users/components/UserHeader";
import UserToolbar from "@features/admin/users/components/UserToolbar";
import UserPagination from "@features/admin/users/components/UserPagination";
import UserTable from "@features/admin/users/components/UserTable/UserTable";
import {useUserManagement} from "@features/admin/users/hooks/useUserManagement";

export default function usersManagement({}) {
  
  const 

  return (
    <div className="min-h-screen space-y-6 bg-linear-to-br from-slate-950 to-slate-900 p-8">
      <UserHeader />

      <UserToolbar />

      <UserTable
        users={users}
        isPending={isPending}
      />

      <UserPagination />
    </div>
  );
}
