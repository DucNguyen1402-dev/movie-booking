import { userValidationRules } from "@config/admin/users";

import { editUserFields } from "@features/admin/users/edit/config";
import {
  FormLabel,
  Input,
  PasswordField,
  Select,
} from "@components/admin/ui/form";

const UserEditForm = ({ register, errors }) => {
  return (
    <form className="flex flex-col gap-8">
      {editUserFields.map(({ required, name, label, type }) => {
        const Component = type === "password" ? PasswordField : Input;
        return (
          <div className="flex flex-col gap-3" key={name}>
            <FormLabel htmlFor={name} required={required}>
              {label}
            </FormLabel>
            <Component
              name={name}
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
          id="maLoaiNguoiDung"
          label="Vai trò"
          required
          options={[
            { label: "Quản trị viên", value: "QuanTri" },
            { label: "Khách hàng", value: "KhachHang" },
          ]}
          error={errors.maLoaiNguoiDung?.message}
          {...register("maLoaiNguoiDung", userValidationRules.maLoaiNguoiDung)}
        />
      </div>
    </form>
  );
};

export default UserEditForm;
