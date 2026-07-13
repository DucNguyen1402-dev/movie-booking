import { SquarePen, Trash } from "lucide-react";
import { userRoleLabel } from "../../../constants/user-role-labels";
import { useRef, useEffect } from "react";
import { USER_HIGHLIGHTS } from "@config/admin/userHighlights";
import { useUserDeletion } from "../../../hooks/useUserDeletion";
import { useNavigate, useLocation } from "react-router-dom";

export default function TableRows({ users, highlightAccount, highlight , setHighlightAccount}) {
  const { onDeletionClick } = useUserDeletion();
  const location = useLocation();
  const navigate = useNavigate();
  const history = location.state?.history ?? [];

  const onEditClick = (account) =>
    navigate(`/admin/users/edit/${account}`, {
      state: { history: [...history, location.pathname] },
    });

  const rowRef = useRef(null);

  const highlightClass = USER_HIGHLIGHTS[highlight];

  useEffect(() => {
    if (!highlightAccount) return;

    rowRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
 
  }, [highlightAccount]);

  return (
    <>
      {users.map((user) => {
        const isMatched = user.taiKhoan === highlightAccount;
  
        return (
          <tr
            key={user.taiKhoan}
            className={`border-t border-slate-700 px-5 transition-all hover:bg-slate-700/50 ${isMatched ? highlightClass : "duration-300"}`}
            ref={isMatched ? rowRef : null}
          >
            <td className="px-8 py-4 font-medium break-all">{user.taiKhoan}</td>

            <td className="break-all">{user.hoTen}</td>

            <td className="break-all">{user.email}</td>

            <td className="break-all">{user.soDT}</td>

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
                <button
                  className="cursor-pointer rounded-md p-2 transition-colors duration-300 hover:bg-indigo-500/20 hover:text-indigo-400"
                  onClick={() => onEditClick(user.taiKhoan)}
                >
                  <SquarePen className="size-4" />
                </button>

                <button
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
