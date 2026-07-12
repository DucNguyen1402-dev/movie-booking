import { useAddForm } from "../../hooks/useAddForm";
import { useUserFormActions } from "../../hooks/useUserFormActions";
import { validationRules } from "../../constants/validationRules";
import Input from "./InputForm";
import Select from "./SelectForm";
import FormActions from "./FormActions";

export default function AddUserForms() {
  const { register, handleSubmit , errors} = useAddForm();

  const { onCancelAddUserClick , onAddUserClick} = useUserFormActions({ handleSubmit });

  return (
    <div className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-gray-50 p-8 shadow-sm">
      <form className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Input
            label="Tài khoản"
            required
            name="taiKhoan"
      
            register={register}
            rules={validationRules.taiKhoan}
            error = {errors.taiKhoan}
          />

          <Input
            label="Mật khẩu"
            type="password"
            required

            name="matKhau"
            register={register}
            rules={validationRules.matKhau}
            error = {errors.matKhau}
          />

          <Input
            label="Họ tên"
            required
            name="hoTen"

            register={register}
            rules={validationRules.hoTen}
            error = {errors.hoTen}
          />

          <Input
            label="Email"
            type="email"
            name="email"
            required
            register={register}
            rules={validationRules.email}
            error = {errors.email}
          />

          <Input
            label="Số điện thoại"
            required
            name="soDt"
            register={register}
            rules={validationRules.soDt}
            error = {errors.soDt}
          />

          <Select
            label="Vai trò"
            register={register}
            name="maLoaiNguoiDung"
            options={[
              { value: "KhachHang", label: "Khách hàng" },
              { value: "QuanTri", label: "Quản trị" },
            ]}
            rules={validationRules.maLoaiNguoiDung}
            error = {errors.maLoaiNguoiDung}
          />
        </div>

        <FormActions onCancelClick={onCancelAddUserClick} onAddClick = {onAddUserClick}/>
      </form>
    </div>
  );
}
