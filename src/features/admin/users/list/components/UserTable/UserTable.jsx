import { useCallback, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import {
  createEmptyStateContent,
  PaginationControls,
  TableEmptyState,
} from "@shared/table";
import { EmptyStateButton } from "@shared/ui";

import {
  useConsumeLocationState,
  useTemporaryState,
} from "@features/admin/hooks";
import { ENTITIES } from "@features/admin/shared/config";
import { useUsersContext } from "@features/admin/users/contexts";

import { TableRow, TableSkeleton } from ".";

const UserTable = () => {
  const hasMoveToPage = useRef(false);
  const location = useLocation();

  const [rowState] = useTemporaryState({
    account: location.state?.account,
    highlight: location.state?.highlight,
  });

  useConsumeLocationState(["account", "highlight"]);

  const {
    manageUsers: { isPending, isFetching },
    pagination,
    userFilters: { filters, resetSearchFilter, filteredUsers },
  } = useUsersContext();

  if (rowState?.account) {
    pagination.actions.preventNextResetPage();
  }

  const {
    state: { currentSize },
    actions: { setPage },
  } = pagination;
  const moveToAccountPage = useCallback(
    (account) => {
      const userIndex = filteredUsers.findIndex(
        (user) => user.taiKhoan === account,
      );

      if (userIndex === -1) return;

      const targetPage = Math.floor(userIndex / currentSize) + 1;

      setPage(targetPage);
    },
    [currentSize, filteredUsers, setPage],
  );

  useEffect(() => {
    if (!rowState?.account || isFetching || hasMoveToPage.current) return;
    moveToAccountPage(rowState?.account);
    hasMoveToPage.current = true;
  }, [rowState?.account, isFetching, moveToAccountPage]);

  const isUserListEmpty = pagination.state.totalItems === 0;
  const renderTableContent = () => {
    if (isPending) {
      return <TableSkeleton />;
    }

    if (isUserListEmpty) {
      return (
        <TableEmptyState
          colSpan={6}
          {...createEmptyStateContent(ENTITIES.user, filters.keyword)}
        >
          <EmptyStateButton surface="dark" onClick={resetSearchFilter}>
            Xóa bộ lọc
          </EmptyStateButton>
        </TableEmptyState>
      );
    }

    return pagination.state.list.map((user) => (
      <TableRow
        key={user.taiKhoan}
        user={user}
        isMatched={user.taiKhoan === rowState?.account}
        highlight={rowState?.highlight}
      />
    ));
  };

  return (
    <div className="flex flex-col space-y-10">
      {!isUserListEmpty && (
        <PaginationControls pagination={pagination} label="người dùng" />
      )}
      <main className="min-h-screen flex-1 overflow-hidden rounded-lg pb-10">
        <table className="w-full table-fixed border-t border-slate-700 bg-[#1e293b] text-sm text-slate-100">
          <thead>
            <tr className="bg-slate-900/80 text-left font-semibold tracking-wider">
              <th className="3xl:w-80 w-60 px-8 py-6">TÀI KHOẢN</th>
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
};

export default UserTable;
