import { userValidationRules } from "@config/admin";

import { useSyncLeaveConfirmation } from "@hooks/admin";
import { useProfileContext } from "@features/admin/profile/contexts";
import { PasswordInput } from "@components/admin";
import { CancelButton, SaveButton } from "@components/admin/buttons";

export default function PasswordChangeForm() {
  const {
    form: { register, errors, onPasswordSubmitEvent, isDirty },
    profile: { onCancelPasswordChangeClick },
  } = useProfileContext();

  const { matKhau: passwordRules } = userValidationRules;

  useSyncLeaveConfirmation(isDirty);

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

      <div className="flex justify-end gap-3 pt-8">
        <CancelButton
          type="button"
          onClick={onCancelPasswordChangeClick}
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
