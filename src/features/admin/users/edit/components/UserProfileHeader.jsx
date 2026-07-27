import { userRoleMapping } from "@features/admin/users/constants";

const UserProfileHeader = ({ initial, taiKhoan, role }) => {
  const userRole = userRoleMapping[role];
  if (!userRole) return;

  const {
    label,
    variants: { profile: profileClasses },
  } = userRoleMapping[role] ?? {};

  return (
    <div className="mb-10 flex flex-col items-center space-y-3">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-600 text-4xl font-bold">
        {initial}
      </div>

      <h2 className="text-xl font-semibold text-slate-100">{taiKhoan}</h2>

      <p
        className={`flex w-28 items-center justify-center rounded-full py-1 text-xs uppercase ${profileClasses}`}
      >
        {label}
      </p>
    </div>
  );
};

export default UserProfileHeader;
