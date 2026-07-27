import { validationRules } from "@features/admin/users/config";
import { editUserFields } from "@features/admin/users/edit/config";
import {
  FormLabel,
  Input,
  PasswordField,
  SelectForm,
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
              {...register(name, validationRules[name])}
              error={errors[name]?.message}
            />
          </div>
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
};

export default UserEditForm;
