import { LockKeyhole } from "lucide-react";

import { validationRules } from "@features/admin/users/config";

const Input = ({ name, register, error, label, rules, disabled, ...props }) => (
  <div className="space-y-3">
    <label className="block text-sm text-slate-400">{label}</label>

    <div className="relative">
      <input
        name
        type
        disabled={disabled}
        {...props}
        {...register(name, rules)}
        className="w-full rounded-sm border border-slate-600 bg-slate-700 px-4 py-2 text-slate-200 transition outline-none focus:border-indigo-500/10 focus:ring-1 focus:ring-indigo-500"
      />
      {disabled && (
        <div className="absolute top-1/2 right-2 -translate-y-1/2">
          <LockKeyhole className="size-4.5" />
        </div>
      )}
    </div>
    {error && (
      <p className="rounded-md border-l-6 border-red-500 bg-red-950/40 px-3 py-1.5 text-sm text-red-300">
        {error.message}
      </p>
    )}
  </div>
);
const fieldConfig = {
  taiKhoan: {
    label: "Tài khoản",
    disabled: true,
  },
  hoTen: {
    label: "Họ và tên",
    disabled: false,
  },
  email: {
    label: "Email",
    type: "email",
    disabled: false,
  },
  soDT: {
    label: "Số điện thoại",
    disabled: false,
  },
  matKhau: {
    label: "Mật khẩu",
    type: "password",
    disabled: true,
  },
};

export default function UserEditForm({ fields, register, errors }) {
  return (
    <form className="grid gap-6 md:grid-cols-2">
      {Object.keys(fields).map((field) => (
        <Input
          key={field}
          type={fieldConfig[field].type ?? "text"}
          label={fieldConfig[field].label}
          name={field}
          register={register}
          rules={validationRules[field]}
          error={errors[field]}
          disabled={fieldConfig[field].disabled}
        />
      ))}

      <div className="space-y-3">
        <label className="block text-sm text-slate-400">Vai trò</label>

        <select
          {...register("maLoaiNguoiDung")}
          className="w-full rounded-sm border border-slate-600 bg-slate-700 px-4 py-2 text-slate-200 transition outline-none focus:border-indigo-500/10 focus:ring-1 focus:ring-indigo-500"
        >
          <option value="QuanTri">Quản trị viên</option>
          <option value="KhachHang">Khách hàng</option>
        </select>
        {errors["maLoaiNguoiDung"] && (
          <p className="rounded-md border-l-6 border-red-500 bg-red-950/40 px-3 py-1.5 text-sm text-red-300">
            {errors["maLoaiNguoiDung"].message}
          </p>
        )}
      </div>
    </form>
  );
}
