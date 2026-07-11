import { SquarePen, Trash } from "lucide-react";
import {userRoleLabel} from "../../constants/user-role-labels"

export default function TableRows({ users }) {
  return (
    <>
      {users.map((user) => (
        <tr
          key={user.taiKhoan}
          className="border-t border-slate-700 px-5 transition hover:bg-slate-700/50"
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
      ))}
    </>
  );
}
