import { SquarePen, Trash, CalendarCheck } from "lucide-react";
import { userRoleLabel } from "../../../constants/user-role-labels";
import { USER_HIGHLIGHTS } from "@config/admin/userHighlights";
import { useUserDeletion } from "../../../hooks/useUserDeletion";
import { useNavigate, useLocation } from "react-router-dom";
import {useLayoutEffect} from "react"

export default function TableRows({
  users,
  matchedAccount,
  highlight,
  rowRef,
}) {
  const { onDeletionClick, deletingAccount } = useUserDeletion();

  useLayoutEffect(() => {
    if (!rowRef.current) return;

    rowRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [matchedAccount]);

  const location = useLocation();
  const navigate = useNavigate();
  const history = location.state?.history ?? [];

  const onEditClick = (account) =>
    navigate(`/admin/users/edit/${account}`, {
      state: { history: [...history, location.pathname] },
    });

  const onBookingInforClick = (account) =>
    navigate(`/admin/users/booking-infor/${account}`, {
      state: { history: [...history, location.pathname] },
    });

  const highlightClass = USER_HIGHLIGHTS[highlight];

  return (
    <>
      {users.map((user) => {
        const isMatched = user.taiKhoan === matchedAccount;
        const isDeleting = user.taiKhoan === deletingAccount;

        return (
          <tr
            key={user.taiKhoan}
            className={`group px-5 transition-all hover:bg-slate-700/50 ${isMatched ? highlightClass : "duration-300"} ${isDeleting ? "border border-red-600 bg-red-950/20" : "border-t border-slate-700"}`}
            ref={isMatched ? rowRef : null}
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
                  user.maLoaiNguoiDung === "QuanTri"
                    ? "border-violet-500/20 bg-violet-500/10 text-violet-400 group-hover:border-violet-500/80"
                    : "border-blue-500/20 bg-blue-500/10 text-blue-400 group-hover:border-blue-500/80"
                } `}
              >
                {userRoleLabel[user.maLoaiNguoiDung]}
              </span>
            </td>

            <td>
              <div className="flex justify-center gap-2">
                <button
                  title="sửa thông tin"
                  className="cursor-pointer rounded-md p-2 transition-colors duration-300 hover:bg-indigo-500/20 hover:text-indigo-400"
                  onClick={() => onEditClick(user.taiKhoan)}
                >
                  <SquarePen className="size-4" />
                </button>
                <button
                  title="xem thông tin đặt vé"
                  className="cursor-pointer rounded-md p-2 transition-colors duration-300 hover:bg-yellow-500/20 hover:text-yellow-400"
                  onClick={() => onBookingInforClick(user.taiKhoan)}
                >
                  <CalendarCheck className="size-4" />
                </button>
                <button
                  title="xóa người dùng"
                  className="cursor-pointer rounded-md p-2 transition-colors duration-300 hover:bg-red-500/20 hover:text-red-400"
                  onClick={() => onDeletionClick(user.taiKhoan)}
                >
                  <Trash className="size-4" />
                </button>
              </div>
            </td>
          </tr>
        );
      })}
    </>
  );
}
