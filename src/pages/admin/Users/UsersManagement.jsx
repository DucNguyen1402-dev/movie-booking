import UserHeader from "@features/admin/users/components/users-management/UserHeader";
import UserToolbar from "@features/admin/users/components/users-management/UserToolbar";
import UserPagination from "@features/admin/users/components/users-management/UserPagination";
import UserTable from "@features/admin/users/components/users-management/UserTable/UserTable";

export default function usersManagement() {
  return (
    <div className="min-h-screen space-y-6 bg-linear-to-br from-slate-950 to-slate-900 p-8">
      <UserHeader />

      <UserToolbar />

      <UserTable />

      <UserPagination />
    </div>
  );
}
