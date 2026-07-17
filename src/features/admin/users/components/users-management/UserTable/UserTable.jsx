import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUsersContext } from "../../../contexts/UsersContext";
import { EmptyStateButton } from "@components/admin/buttons";
import { EmptyTable } from "@components/admin";
import TableSkeleton from "./TableSkeleton";
import TableRows from "./TableRows";
import UserPagination from "../UserPagination";

export default function UserTable() {
  const location = useLocation();
  const navigate = useNavigate();
  const [rowState, setRowState] = useState(() => ({
    account: location.state?.account ?? "",
    highlight: location.state?.highlight ?? "",
  }));
  const {
    usersStates: { isPending, isFetching },
    userPagination: {
      paginatedUsers,
      pagination,
      moveToAccountPage,
      skipNextPageReset,
    },
    userFilters: { filters, resetSearchFilter },
  } = useUsersContext();

  if (rowState.account) {
    skipNextPageReset.current = true;
  }
  useEffect(() => {
    if (!rowState.account || isFetching) return;

    moveToAccountPage(rowState.account);
    navigate(location.pathname, {
      replace: true,
      state: { history: location.state?.history ?? [] },
    });
  }, [rowState.account, isFetching]);

  useEffect(() => {
    const keys = ["highlight", "account"];

    const timers = keys
      .filter((key) => rowState[key])
      .map((key) =>
        setTimeout(() => {
          setRowState((prev) => ({ ...prev, [key]: "" }));
        }, 3000),
      );

    return () => timers.forEach(clearTimeout);
  }, [rowState.highlight, rowState.account]);

  const isUserListEmpty = paginatedUsers.length === 0;
  const renderTableContent = () => {
    if (isPending) {
      return <TableSkeleton />;
    }

    if (isUserListEmpty) {
      return (
        <EmptyTable
          colSpan={6}
          title="Không tìm thấy user"
          description={`Không có tên user nào khớp với từ khóa "${filters.keyword}"`}
        >
          <EmptyStateButton surface="dark" onClick={resetSearchFilter}>
            Xóa bộ lọc
          </EmptyStateButton>
        </EmptyTable>
      );
    }

    return (
      <TableRows
        currentPage={pagination.page}
        users={paginatedUsers}
        matchedAccount={rowState.account}
        highlight={rowState.highlight}
      />
    );
  };

  return (
    <div className="flex  flex-col space-y-10">
      {!isUserListEmpty && <UserPagination />}
      <main className="flex-1 pb-10 rounded-lg bg-[#1e293b] overflow-hidden">
        <table className="w-full table-fixed border-t border-slate-700  text-sm text-slate-100 ">
          <thead>
            <tr className="text-left font-semibold tracking-wider bg-slate-900/80">
              <th className="3xl:w-80 w-70 px-8 py-6">TÀI KHOẢN</th>
              <th className="3xl:w-70 w-60">HỌ & TÊN</th>
              <th className="3xl:w-80 w-60">EMAIL</th>
              <th>SĐT</th>
              <th>VAI TRÒ</th>
              <th className="text-center">HÀNH ĐỘNG</th>
            </tr>
          </thead>

          <tbody className="text-slate-200">{renderTableContent()}</tbody>
        </table>
      </main>
    </div>
  );
}
