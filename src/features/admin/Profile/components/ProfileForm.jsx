import { SaveButton } from "@components/admin/buttons";
import { Input } from "@components/admin";
import { userValidationRules } from "@config/admin";
import { useProfileForm } from "../hooks/useProfileForm";

const profileFieldConfigs = [
  { label: "TÀI KHOẢN", name: "taiKhoan", disabled: true },
  { label: "HỌ VÀ TÊN", name: "hoTen" },
  { label: "EMAIL", name: "email", type: "email" },
  { label: "SỐ ĐT", name: "soDt", type: "number" },
];

export const createProfileFields = ({ errors }) =>
  profileFieldConfigs.map((field) => ({
    ...field,
    rules: userValidationRules[field.name],
    error: errors[field.name],
  }));

export default function ProfileForm() {
  const { register, errors, onSubmitEvent } = useProfileForm();
  const profileFields = createProfileFields({ errors });

  return (
    <form onSubmit={onSubmitEvent} className="space-y-5">
      {profileFields.map((field) => (
        <Input key={field.name} register={register} {...field} />
      ))}

      <div className="mt-16 flex items-center justify-center">
        <SaveButton type="submit">Cập nhật thông tin của bạn</SaveButton>
      </div>
    </form>
  );
}
