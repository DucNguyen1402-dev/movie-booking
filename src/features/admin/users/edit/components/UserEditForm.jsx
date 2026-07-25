import { validationRules } from "@features/admin/users/config";
import { editUserFields } from "@features/admin/users/edit/config";
import { Input, PasswordInput, SelectForm } from "@components/admin";

export default function UserEditForm({ register, errors }) {
  return (
    <form className="flex flex-col gap-8">
      {editUserFields.map((field) => {
        const Component = field.type === "password" ? PasswordInput : Input;

        return (
          <Component
            key={field.name}
            label={field.label}
            name={field.name}
            required={field.required}
            register={register}
            rules={validationRules[field.name]}
            error={errors[field.name]}
            disabled={field.disabled}
          />
        );
      })}

      <SelectForm
        label="Vai trò"
        required
        options={[
          { label: "Quản trị viên", value: "QuanTri" },
          { label: "Khách hàng", value: "KhachHang" },
        ]}
        name="maLoaiNguoiDung"
        register={register}
        error={errors.maLoaiNguoiDung}
      />
    </form>
  );
}
