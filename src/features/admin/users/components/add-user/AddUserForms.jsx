import {useEffect} from "react"
import {useNavigate, useLocation} from "react-router-dom"
import { useAddForm } from "../../hooks/useAddForm";
import { useUserFormActions } from "../../hooks/useUserFormActions";
import { validationRules } from "../../constants/validationRules";
import Input from "./InputForm";
import Select from "./SelectForm";
import FormActions from "./FormActions";



export default function AddUserForms() {
  const { register, handleSubmit, errors, isDirty } = useAddForm();


  const navigate = useNavigate();
  const location = useLocation();

   useEffect(() => {
    navigate(".", {
      replace: true,
      state: {
        ...location.state,
        shouldConfirmLeave: isDirty,
      },
    });
  }, [isDirty]);

  const { onCancelAddUserClick, onAddUserClick } = useUserFormActions({
    handleSubmit,
  });

  return (
    <div className="relative mx-auto max-w-3xl rounded-xl border border-slate-700 bg-gray-800 p-8 pb-3 shadow-sm">
      <form className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <Input
            label="Tài khoản"
            required
            name="taiKhoan"

            register={register}
            rules={validationRules.taiKhoan}
            error={errors.taiKhoan}
          />

          <Input
            label="Mật khẩu"
            type="password"
            required

            name="matKhau"
            register={register}
            rules={validationRules.matKhau}
            error={errors.matKhau}
          />

          <Input
            label="Họ tên"
            required
            name="hoTen"

            register={register}
            rules={validationRules.hoTen}
            error={errors.hoTen}
          />

          <Input
            label="Email"
            type="email"
            name="email"
            required
            register={register}
            rules={validationRules.email}
            error={errors.email}
          />

          <Input
            label="Số điện thoại"
            required
            name="soDt"
            register={register}
            rules={validationRules.soDt}
            error={errors.soDt}
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
            error={errors.maLoaiNguoiDung}
          />
        </div>

      
      </form>

        <div className ="mt-16">
          <FormActions
          onCancelClick={onCancelAddUserClick}
          onAddClick={onAddUserClick}
        />

        </div>
        <p className="absolute left-6 bottom-3 text-[12px] text-slate-400 italic">
          * Vui lòng kiểm tra kỹ lại thông tin trước khi bấm tạo người dùng
        </p>
    </div>
  );
}
