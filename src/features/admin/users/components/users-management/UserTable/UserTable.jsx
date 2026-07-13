import { useLocation, useNavigate } from "react-router-dom";
import TableSkeleton from "./TableSkeleton";
import TableRows from "./TableRows";
import { useUsersContext } from "../../../contexts/UsersContext";
import { useState, useEffect } from "react";

export default function UserTable() {
  const {
    usersStates: { isPending },
    userPagination: { paginatedUsers },
  } = useUsersContext();

  const location = useLocation();
  const navigate = useNavigate();
  const { account = "", highlight = "none", history } = location?.state ?? {};
  const [highlightAccount, setHighlightAccount] = useState(null);

  useEffect(() => {
    if (!account) return;

    setHighlightAccount(account);

    navigate(".", {
      replace: true,
      state: { history },
    });
  }, [account, navigate]);

  const tableContent = isPending ? (
    <TableSkeleton />
  ) : (
    <TableRows
      users={paginatedUsers}
      highlightAccount={highlightAccount}
      highlight={highlight}
      setHighlightAccount={setHighlightAccount}
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
