import { List, Search } from "lucide-react";
import PlusButton from "@components/admin/PlusButton";

export default function usersManagement({ users = [] }) {
  return (
    <div className="min-h-screen space-y-6 bg-slate-900 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-300">
          <List className="size-6" />
          <p>Danh sách người dùng trong hệ thống</p>
        </div>

        <PlusButton label={"Thêm người dùng"} type={"button"} />
      </div>

      {/* Toolbar */}
      <div className="grid grid-cols-5 gap-3 rounded-md  bg-slate-800 p-4 text-white">
        <div className="relative col-span-3">
          <input
            placeholder="Tìm theo tài khoản hoặc họ tên..."
            className="w-full rounded-md border border-slate-700 bg-[#0f172a] py-2.5 pr-10 pl-4 text-slate-100 outline-none placeholder:text-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
          <div className="absolute top-1/2 right-4 -translate-y-1/2">
            <Search className="size-5.5 text-slate-300" />
          </div>
        </div>

        <select className="rounded-md border border-slate-700 bg-[#0f172a] px-4 text-slate-100 transition-colors duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20">
          <option value="all">Tất cả vai trò</option>
          <option value="quanTri">Quản trị</option>
          <option value="khachHang">Khách hàng</option>
        </select>

        <select className="rounded-md border border-slate-700 px-4 bg-[#0f172a]  text-slate-100 transition-colors duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20">
          <option value="10">10 / trang</option>
          <option value="20">20 / trang</option>
          <option value="50">50 / trang</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-md ">
        <table className="w-full ">
          <thead className="bg-slate-800 text-slate-100 ">
            <tr className="text-left text-sm font-semibold ">
              <th className="px-5 py-4">Tài khoản</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>SĐT</th>
              <th>Vai trò</th>
              <th className="text-center">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.taiKhoan}
                className="border-t transition hover:bg-slate-50"
              >
                <td className="px-5 py-4 font-medium">{user.taiKhoan}</td>

                <td>{user.hoTen}</td>

                <td>{user.email}</td>

                <td>{user.soDt}</td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      user.maLoaiNguoiDung === "QuanTri"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-sky-100 text-sky-700"
                    } `}
                  >
                    {user.maLoaiNguoiDung}
                  </span>
                </td>

                <td>
                  <div className="flex justify-center gap-2">
                    <button className="rounded-md p-2 hover:bg-slate-100">
                      ✏️
                    </button>

                    <button className="rounded-md p-2 hover:bg-red-100">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>Hiển thị 1-10 / 120 người dùng</span>

        <div className="flex gap-2">
          <button className="rounded border px-3 py-2">&lt;</button>
          <button className="rounded bg-orange-500 px-3 py-2 text-white">
            1
          </button>
          <button className="rounded border px-3 py-2">2</button>
          <button className="rounded border px-3 py-2">3</button>
          <button className="rounded border px-3 py-2">&gt;</button>
        </div>
      </div>
    </div>
  );
}
