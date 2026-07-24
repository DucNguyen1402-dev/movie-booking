import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useUsersContext } from "@features/admin/users/contexts";
import { EmptyTable } from "@components/admin";
import { PaginationControls } from "@components/admin";
import { EmptyStateButton } from "@components/admin/buttons";

import TableRow from "./TableRow";
import TableSkeleton from "./TableSkeleton";

export default function UserTable() {
  const location = useLocation();
  const navigate = useNavigate();

  const [rowState, setRowState] = useState(() => ({
    account: location.state?.account ?? "",
    highlight: location.state?.highlight ?? "",
  }));
  const {
    usersStates: { isPending, isFetching },
    pagination,
    userFilters: { filters, resetSearchFilter, filteredUsers },
  } = useUsersContext();

  if (rowState.account) {
    pagination.preventNextReset();
  }

  const moveToAccountPage = useCallback(
    () => (account) => {
      const userIndex = filteredUsers.findIndex(
        (user) => user.taiKhoan === account,
      );

      if (userIndex === -1) return;

      const targetPage = Math.floor(userIndex / pagination.currentSize) + 1;

      pagination.setPage(targetPage);
    },
    [filteredUsers, pagination],
  );

  useEffect(() => {
    if (!rowState.account || isFetching) return;

    moveToAccountPage(rowState.account);
    navigate(location.pathname, {
      replace: true,
      state: { history: location.state?.history ?? [] },
    });
  }, [
    rowState.account,
    isFetching,
    moveToAccountPage,
    navigate,
    location.pathname,
    location.state?.history,
  ]);

  useEffect(() => {
    const keys = ["highlight", "account"];

    const timers = keys
      .filter((key) => rowState[key])
      .map((key) =>
        setTimeout(() => {
          setRowState((prev) => ({ ...prev, [key]: "" }));
        }, 10000),
      );

    return () => timers.forEach(clearTimeout);
  }, [rowState.highlight, rowState.account, rowState]);

  const isUserListEmpty = pagination.list.length === 0;
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

    return pagination.list.map((user) => (
      <TableRow
        key={user.taiKhoan}
        user={user}
        isMatched={user.taiKhoan === rowState.account}
        highlight={rowState.highlight}
      />
    ));
  };

  return (
    <div className="flex flex-col space-y-10">
      {!isUserListEmpty && (
        <PaginationControls controls={pagination.controls} label="người dùng" />
      )}
      <main className="min-h-screen flex-1 overflow-hidden rounded-lg pb-10">
        <table className="w-full table-fixed border-t border-slate-700 bg-[#1e293b] text-sm text-slate-100">
          <thead>
            <tr className="bg-slate-900/80 text-left font-semibold tracking-wider">
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
