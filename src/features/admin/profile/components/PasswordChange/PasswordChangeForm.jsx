import { PasswordInput } from "@components/admin";
import { useProfileContext } from "@features/admin/profile/contexts";
import { userValidationRules } from "@config/admin";
import { CancelButton, SaveButton } from "@components/admin/buttons";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function PasswordChangeForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    profileForm: { register, errors, onPasswordSubmitEvent, isDirty , onCancelPasswordChangeClick},
  } = useProfileContext();

  const { matKhau: passwordRules } = userValidationRules;

  useEffect(() => {
    navigate(".", {
      state: {
        ...location.state,
        shouldConfirmLeave: isDirty,
      },
    });
  }, [isDirty]);

  return (
    <form className="space-y-5" onSubmit={onPasswordSubmitEvent}>
      <PasswordInput
        label="Mật khẩu hiện tại"
        register={register}
        name="matKhauHienTai"
        rules={passwordRules}
        error={errors["matKhauHienTai"]}
      />
      <PasswordInput
        label="Mật khẩu mới"
        register={register}
        name="matKhauMoi"
        rules={passwordRules}
        error={errors["matKhauMoi"]}
      />
      <PasswordInput
        label="Xác nhận mật khẩu mới"
        register={register}
        name="xacNhanMatKhauMoi"
        rules={passwordRules}
        error={errors["xacNhanMatKhauMoi"]}
      />

      <div className="flex gap-3 justify-end pt-8">
        <CancelButton
          type="button"
          onClick ={onCancelPasswordChangeClick}
          surface="dark"
        >
          Hủy
        </CancelButton>
        <SaveButton type="submit" surface="dark">
          Cập nhật
        </SaveButton>
      </div>
    </form>
  );
}
