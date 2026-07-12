import { SquarePen, Trash } from "lucide-react";
import { userRoleLabel } from "../../../constants/user-role-labels";
import { useRef, useEffect } from "react";
import { USER_HIGHLIGHTS } from "@config/admin/userHighlights";

export default function TableRows({ users, newAccount, highlight }) {
  const rowRef = useRef(null);

  const highlightClass = USER_HIGHLIGHTS[highlight];

  useEffect(() => {
    if (!newAccount) return;

    rowRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [newAccount]);

  return (
    <>
      {users.map((user) => {
        const isNewAccount = user.taiKhoan === newAccount;

        return (
          <tr
            key={user.taiKhoan}
            className={`border-t border-slate-700 px-5 transition-all hover:bg-slate-700/50 ${isNewAccount ? highlightClass : "duration-300"}`}
            ref={isNewAccount ? rowRef : null}
          >
            <td className="px-10 py-4 font-medium">{user.taiKhoan}</td>

            <td>{user.hoTen}</td>

            <td>{user.email}</td>

            <td>{user.soDT}</td>

            <td>
              <span
                className={`inline-flex w-25 items-center justify-center rounded-full py-2 text-xs font-semibold ${
                  user.maLoaiNguoiDung === "QuanTri"
                    ? "bg-violet-500/10 text-violet-400"
                    : "bg-blue-500/10 text-blue-400"
                } `}
              >
                {userRoleLabel[user.maLoaiNguoiDung]}
              </span>
            </td>

            <td>
              <div className="flex justify-center gap-2">
                <button className="cursor-pointer rounded-md p-2 transition-colors duration-300 hover:bg-indigo-500/20 hover:text-indigo-400">
                  <SquarePen className="size-4" />
                </button>

                <button className="cursor-pointer rounded-md p-2 transition-colors duration-300 hover:bg-red-500/20 hover:text-red-400">
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
