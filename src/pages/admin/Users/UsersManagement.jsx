import {List, Plus} from "lucide-react";


export default function usersManagement({users = []}) {
  return (
    <div className="space-y-6 bg-slate-900 min-h-screen p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className = "flex items-center gap-2 text-slate-300">
           <List className ="size-6"/>
          <p>
           Danh sách người dùng trong hệ thống 
          </p>
        </div>

        <button className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-green-500 cursor-pointer flex items-center gap-1">
          <Plus className ="size-6"/> 
          <span>Thêm người dùng</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 rounded-xl border bg-white p-4">
        <input
          placeholder="Tìm theo tài khoản hoặc họ tên..."
          className="h-11 flex-1 rounded-lg border px-4 outline-none focus:border-orange-500"
        />

        <select className="h-11 rounded-lg border px-4">
          <option>Tất cả vai trò</option>
          <option>Quản trị</option>
          <option>Khách hàng</option>
        </select>

        <select className="h-11 rounded-lg border px-4">
          <option>10 / trang</option>
          <option>20 / trang</option>
          <option>50 / trang</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border bg-white">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr className="text-left text-sm font-semibold text-slate-600">
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
