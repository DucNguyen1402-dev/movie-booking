import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { SaveButton } from "@components/admin/buttons";
import { Input } from "@components/admin";
import { userValidationRules } from "@config/admin";
import { useProfileContext } from "../contexts";

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

  const onChangePasswordClick = () =>
    navigate("/admin/profile/password", {
      state: {
        history: [...(location.state?.history ?? []), location.pathname],
      },
    });

  return (
    <form onSubmit={onSubmitEvent} className="space-y-5">
      {profileFields.map((field) => (
        <Input key={field.name} register={register} {...field} />
      ))}

      <div className="flex justify-end">
        <button
          className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-slate-400 transition-colors duration-300 hover:bg-red-950/10 hover:text-rose-700"
          onClick={onChangePasswordClick}
        >
          <span className="text-xs">Đổi mật khẩu</span>
          <MoveRight className="size-3.5 translate-y-px" />
        </button>
      </div>
      <div className="mt-16 flex items-center justify-center">
        <SaveButton type="submit">Cập nhật thông tin của bạn</SaveButton>
      </div>
    </form>
  );
}
