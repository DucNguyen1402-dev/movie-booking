import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SaveButton } from "@components/admin/buttons";
import { Input } from "@components/admin";
import { userValidationRules } from "@config/admin";
import { useProfileContext } from "../../contexts";

const profileFieldConfigs = [
  { label: "TÀI KHOẢN", name: "taiKhoan", disabled: true },
  { label: "HỌ VÀ TÊN", name: "hoTen" },
  { label: "EMAIL", name: "email", type: "email" },
  { label: "SỐ ĐT", name: "soDT", type: "number" },
];

export const createProfileFields = ({ errors }) =>
  profileFieldConfigs.map((field) => ({
    ...field,
    rules: userValidationRules[field.name],
    error: errors[field.name],
  }));

export default function ProfileForm() {
  const {
    profileForm: { register, errors, onSubmitEvent, isDirty },
  } = useProfileContext();
  const profileFields = createProfileFields({ errors });


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

  return (
    <form onSubmit={onSubmitEvent} className="space-y-5">
      {profileFields.map((field) => (
        <Input key={field.name} register={register} {...field} />
      ))}

      <div className ="flex justify-end mt-16">
        <SaveButton type="submit">Lưu thông tin</SaveButton>
      </div>
    </form>
  );
}
