import { useLocation } from "react-router-dom";
import TableSkeleton from "./TableSkeleton";
import TableRows from "./TableRows";
import { useUsersContext } from "../../../contexts/UsersContext";

export default function UserTable() {
  const {
    usersStates: { isPending },
    userPagination: { paginatedUsers },
  } = useUsersContext();

  const location = useLocation();
  const { newAccount = "", highlight = "none" } = location?.state ?? {};

  const tableContent = isPending ? (
    <TableSkeleton />
  ) : (
    <TableRows
      users={paginatedUsers}
      newAccount={newAccount}
      highlight={highlight}
    />
  );

  return (
    <table className="w-full table-fixed border border-slate-700 text-sm text-slate-100">
      <thead>
        <tr className="bg-slate-800 text-left font-semibold tracking-wider">
          <th className="w-70 px-8 py-6 3xl:w-80">TÀI KHOẢN</th>
          <th className="w-60 3xl:w-70">HỌ & TÊN</th>
          <th className="w-60 3xl:w-80">EMAIL</th>
          <th>SĐT</th>
          <th>VAI TRÒ</th>
          <th className="text-center">HÀNH ĐỘNG</th>
        </tr>
      </thead>

      <tbody className="bg-slate-800">{tableContent}</tbody>
    </table>
  );
}
