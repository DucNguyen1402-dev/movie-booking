import { useMemo } from "react";

import { USER_HIGHLIGHTS } from "@config/admin";
import { CalendarCheck, SquarePen, Trash } from "lucide-react";

import { userRoleMapping } from "@features/admin/users/constants";
import { useTableRow } from "@features/admin/users/list/hooks";
import { Button } from "@components/admin/ui";

const TableRow = ({ user, isMatched, highlight }) => {
  const {
    onDeletionClick,
    rowRef,
    onEditClick,
    onBookingInforClick,
    deletingAccount,
  } = useTableRow({ isMatched });

  const highlightClass = USER_HIGHLIGHTS[highlight];
  const isDeleting = deletingAccount === user.taiKhoan;

  const {
    label,
    variants: { table: tableRoleClasses },
  } = userRoleMapping[user.maLoaiNguoiDung];

  const actionButtonsConfig = useMemo(
    () => [
      {
        key: "edit",
        title: "sửa thông tin",
        className: "hover:bg-indigo-500/20 hover:text-indigo-400",
        Icon: SquarePen,
        onClick: () => onEditClick(user.taiKhoan),
      },
      {
        key: "bookingInfor",
        title: "xem thông tin đặt vé",
        className: "hover:bg-yellow-500/20 hover:text-yellow-400",
        Icon: CalendarCheck,
        onClick: () => onBookingInforClick(user.taiKhoan),
      },
      {
        key: "delete",
        title: "xóa người dùng",
        className: "hover:bg-red-500/20 hover:text-red-400",
        Icon: Trash,
        onClick: () => onDeletionClick(user.taiKhoan),
      },
    ],
    [onBookingInforClick, onDeletionClick, onEditClick, user.taiKhoan],
  );

  return (
    <tr
      key={user.taiKhoan}
      className={`group px-5 transition-all hover:bg-slate-700/50 ${isMatched ? highlightClass : "duration-300"} ${isDeleting ? "border border-red-600 bg-red-950/20" : "border-t border-slate-700"}`}
      ref={rowRef}
    >
      <td className="px-8 py-4 font-medium break-all transition-colors duration-100 group-hover:text-slate-50">
        {user.taiKhoan}
      </td>

      <td className="break-all transition-colors duration-100 group-hover:text-slate-50">
        {user.hoTen}
      </td>

      <td className="break-all transition-colors duration-100 group-hover:text-slate-50">
        {user.email}
      </td>

      <td className="break-all transition-colors duration-100 group-hover:text-slate-50">
        {user.soDT}
      </td>

      <td>
        <span
          className={`inline-flex w-25 items-center justify-center rounded-full border py-2 text-xs font-semibold transition-colors duration-200${
            tableRoleClasses
          } `}
        >
          {label}
        </span>
      </td>

      <td>
        <div className="flex justify-center gap-2">
          {actionButtonsConfig.map((actionButton) => (
            <Button
              key={actionButton.key}
              title={actionButton.title}
              className={` ${actionButton.className}`}
              onClick={actionButton.onClick}
              size="sm"
            >
              <actionButton.Icon className="size-4" />
            </Button>
          ))}
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
