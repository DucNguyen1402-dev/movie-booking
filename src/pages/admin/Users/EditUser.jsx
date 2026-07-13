import { PencilLine } from "lucide-react";
import { useParams } from "react-router-dom";
import { useUsers } from "@hooks/admin/useUsers";
import {CancelButton, SaveButton} from "@components/admin/buttons"

export default function EditUser() {
  const { account } = useParams();
  const { data: users = [] } = useUsers();
  const targetUser = users.find((user) => user.taiKhoan === account) ?? {};

  const initial = targetUser?.hoTen?.charAt(0).toUpperCase() ?? "";

  const roleMapping = {
    QuanTri: "Quản trị viên",
    KhachHang: "Khách hàng",
  };

  console.log(targetUser)

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 p-8 text-slate-100">
      <div className="mx-auto max-w-4xl space-y-5">
        <div className="flex items-center justify-center gap-3 text-slate-200">
          <PencilLine className="size-4" />
          <p className="mt-2 text-center">
            Thay đổi thông tin trong biểu mẫu để cập nhật thông tin người dùng.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-700 bg-slate-800 p-8 shadow-xl">
          {/* Avatar */}
          <div className="mb-10 flex flex-col items-center space-y-3">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-600 text-3xl font-bold">
              {initial}
            </div>

            <h2 className="text-2xl font-semibold text-slate-100">
              {targetUser.taiKhoan}
            </h2>

            <p className="text-sm text-slate-200">
              {roleMapping[targetUser.maLoaiNguoiDung]}
            </p>
          </div>

          {/* Form */}
          <form className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <label className="block text-sm text-slate-400">
                Tên tài khoản
              </label>

              <input
                value={targetUser.taiKhoan}
                className="w-full rounded-sm border border-slate-600 bg-slate-700 px-4 py-2 text-slate-200 outline-none focus:border-indigo-500/10 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm text-slate-400">Họ và tên</label>

              <input
                value={targetUser.hoTen}
                className="w-full rounded-sm border border-slate-600 bg-slate-700 px-4 py-2 text-slate-200 transition outline-none focus:border-indigo-500/10 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm text-slate-400">Email</label>

              <input
                value={targetUser.email}
                type="email"
                className="w-full rounded-sm border border-slate-600 bg-slate-700 px-4 py-2 text-slate-200 transition outline-none focus:border-indigo-500/10 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm text-slate-400">
                Số điện thoại
              </label>

              <input
                value={targetUser.soDT}
                className="w-full rounded-sm border border-slate-600 bg-slate-700 px-4 py-2 text-slate-200 transition outline-none focus:border-indigo-500/10 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm text-slate-400">Mật khẩu</label>

              <input
                type="password"
                value={targetUser.matKhau}
                className="w-full rounded-sm border border-slate-600 bg-slate-700 px-4 py-2 text-slate-200 transition outline-none focus:border-indigo-500/10 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm text-slate-400">Vai trò</label>

              <select
                value={targetUser.maLoaiNguoiDung}
                className="w-full rounded-sm border border-slate-600 bg-slate-700 px-4 py-2 text-slate-200 transition outline-none focus:border-indigo-500/10 focus:ring-1 focus:ring-indigo-500"
              >
                <option value="QuanTri">Khách hàng</option>
                <option value="KhachHang">Quản trị viên</option>
              </select>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-10 flex justify-end gap-4">
            <CancelButton surface ="dark">
              Hủy
            </CancelButton>

            <SaveButton surface ="dark">
              Lưu thông tin
            </SaveButton>
          </div>
        </div>
      </div>
    </div>
  );
}
