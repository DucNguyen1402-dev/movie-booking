import { useLocation, useNavigate } from "react-router-dom";
import TableSkeleton from "./TableSkeleton";
import TableRows from "./TableRows";
import EmptyUsers from "./EmptyUsers";
import { useUsersContext } from "../../../contexts/UsersContext";
import UserPagination from "../UserPagination";
import { useEffect, useState } from "react";

export default function UserTable() {
  const location = useLocation();
  const navigate = useNavigate();
  const [rowState] = useState(() => ({
    account: location.state?.account ?? "",
    highlight: location.state?.highlight ?? "",
  }));
  const {
    usersStates: { isPending },
    userPagination: {
      paginatedUsers,
      pagination,
      moveToAccountPage,
      skipNextPageReset,
    },
  } = useUsersContext();

  if (rowState.account) {
    skipNextPageReset.current = true;
  }
  useEffect(() => {
    if (!rowState.account) return;
    moveToAccountPage(rowState.account);
    navigate(location.pathname, {
      replace: true,
      state: { history: location.state?.history ?? [] },
    });
  }, [rowState.account]);

  const isUserListEmpty = paginatedUsers.length === 0;

  const tableContent = isPending ? (
    <TableSkeleton />
  ) : isUserListEmpty ? (
    <EmptyUsers />
  ) : (
    <TableRows
      currentPage={pagination.page}
      users={paginatedUsers}
      matchedAccount={rowState.account}
      highlight={rowState.highlight}
    />
  );

  return (
    <div className="space-y-15">
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

      {!isUserListEmpty && <UserPagination />}
    </div>
  );
}
