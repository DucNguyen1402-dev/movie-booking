import { useSyncLeaveConfirmation } from "@hooks/admin";
import { addUserFields } from "@features/admin/users/add/config";
import { useAddActions, useAddForm } from "@features/admin/users/add/hooks";
import { validationRules } from "@features/admin/users/config";
import {
  FormLabel,
  Input,
  PasswordField,
  SelectForm,
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
                  name={name}
                  {...register(name, validationRules[name])}
                  error={errors[name]?.message}
                />
              </div>
            );
          })}

          <SelectForm
            label="Vai trò"
            register={register}
            name="maLoaiNguoiDung"
            options={[
              { value: "KhachHang", label: "Khách hàng" },
              { value: "QuanTri", label: "Quản trị" },
            ]}
            rules={validationRules.maLoaiNguoiDung}
            error={errors.maLoaiNguoiDung}
            defaultOptionLabel="-- Chọn loại người dùng --"
          />
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
