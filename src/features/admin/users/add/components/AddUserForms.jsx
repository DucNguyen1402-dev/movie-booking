import { userValidationRules } from "@config/admin/users";

import { useSyncLeaveConfirmation } from "@hooks/admin";
import { addUserFields } from "@features/admin/users/add/config";
import { useAddActions, useAddForm } from "@features/admin/users/add/hooks";
import {
  FormLabel,
  Input,
  PasswordField,
  Select,
} from "@components/admin/ui/form";

import { FormActions } from ".";
const AddUserForms = () => {
  const { register, handleSubmit, errors, isDirty } = useAddForm();

  const { onCancelAddUserClick, onAddUserClick } = useAddActions({
    handleSubmit,
  });

  useSyncLeaveConfirmation(isDirty);

  return (
    <div className="relative mx-auto max-w-3xl rounded-xl border border-slate-700 bg-gray-800 p-8 pb-5 shadow-sm">
      <form className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          {addUserFields.map(({ label, name, required, type }) => {
            const Component = type === "password" ? PasswordField : Input;
            return (
              <div key={name} className="flex flex-col gap-3">
                <FormLabel htmlFor={name} required={required}>
                  {label}
                </FormLabel>
                <Component
                  {...register(name, userValidationRules[name])}
                  error={errors[name]?.message}
                />
              </div>
            );
          })}

          <div className="flex flex-col gap-3">
            <FormLabel htmlFor="maLoaiNguoiDung" required={true}>
              Vai trò
            </FormLabel>
            <Select
              name="maLoaiNguoiDung"
              options={[
                { value: "KhachHang", label: "Khách hàng" },
                { value: "QuanTri", label: "Quản trị" },
              ]}
              {...register(
                "maLoaiNguoiDung",
                userValidationRules.maLoaiNguoiDung,
              )}

              error={errors.maLoaiNguoiDung?.message}
              defaultOptionLabel="-- Chọn loại người dùng --"
            />
          </div>
        </div>
      </form>

      <div className="mt-16">
        <FormActions
          onCancelClick={onCancelAddUserClick}
          onAddClick={onAddUserClick}
        />
      </div>
      <p className="absolute bottom-3 left-6 text-[12px] text-slate-400 italic">
        * Vui lòng kiểm tra kỹ lại thông tin trước khi bấm tạo người dùng
      </p>
    </div>
  );
};

export default AddUserForms;
