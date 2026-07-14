import { useLocation, useNavigate } from "react-router-dom";
import TableSkeleton from "./TableSkeleton";
import TableRows from "./TableRows";
import { useUsersContext } from "../../../contexts/UsersContext";

export default function UserTable() {
  const {
    usersStates: { isPending },
    userPagination: { paginatedUsers },
  } = useUsersContext();

  const location = useLocation();
  const { account = "", highlight = "none" } = location?.state ?? {};
  
  const tableContent = isPending ? (
    <TableSkeleton />
  ) : (
    <TableRows
      users={paginatedUsers}
      matchedAccount={account}
      highlight={highlight}
    />
  );

  return (
    <table className="w-full table-fixed border border-slate-700 text-sm text-slate-100">
      <thead>
        <tr className="bg-slate-800 text-left font-semibold tracking-wider">
          <th className="3xl:w-80 w-70 px-8 py-6">TÀI KHOẢN</th>
          <th className="3xl:w-70 w-60">HỌ & TÊN</th>
          <th className="3xl:w-80 w-60">EMAIL</th>
          <th>SĐT</th>
          <th>VAI TRÒ</th>
          <th className="text-center">HÀNH ĐỘNG</th>
        </tr>
      </thead>

      <tbody className="bg-slate-800">{tableContent}</tbody>
    </table>
  );
}
