import { useAddForm } from "../../hooks/useAddForm";
import { useUserFormActions } from "../../hooks/useUserFormActions";
import Input from "./InputForm";
import Select from "./SelectForm";
import FormActions from "./FormActions";

export default function AddUserForms() {
  const { register, handleSubmit } = useAddForm();

  const { onCancelAddUserClick } = useUserFormActions({ handleSubmit });

  return (
    <div className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
      <form className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Input
            label="Tài khoản"
            required
            name="taiKhoan"
            register={register}
          />

          <Input
            label="Mật khẩu"
            type="password"
            required
            name="matKhau"
            register={register}
          />

          <Input
            label="Họ tên"
            required
            name="hoTen"

            register={register}
          />

          <Input
            label="Email"
            type="email"
            name="email"
            required
            register={register}
          />

          <Input
            label="Số điện thoại"
            required
            name="soDt"
            register={register}
          />

          <Select
            label="Vai trò"
            register={register}
            name="maLoaiNguoiDung"
            options={[
              { value: "KhachHang", label: "Khách hàng" },
              { value: "QuanTri", label: "Quản trị" },
            ]}
          />
        </div>

        <FormActions onCancel={onCancelAddUserClick} />
      </form>
    </div>
  );
}
