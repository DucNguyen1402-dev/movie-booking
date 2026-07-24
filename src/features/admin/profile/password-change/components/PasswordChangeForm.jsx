import { userValidationRules } from "@config/admin";

import { useSyncLeaveConfirmation } from "@hooks/admin";
import { useProfileContext } from "@features/admin/profile/contexts";
import { CancelButton, PasswordInput, SaveButton } from "@components/admin";

const passwordFieldsConfig = [
  { label: "Mật khẩu hiện tại", name: "matKhauHienTai" },
  { label: "Mật khẩu mới", name: "matKhauMoi" },
  { label: "Xác nhận mật khẩu mới", name: "xacNhanMatKhauMoi" },
];

export default function PasswordChangeForm() {
  const {
    form: { register, errors, onPasswordSubmitEvent, isDirty },
    profile: { onCancelPasswordChangeClick },
  } = useProfileContext();

  const { matKhau: passwordRules } = userValidationRules;

  useSyncLeaveConfirmation(isDirty);

  return (
    <form className="space-y-5" onSubmit={onPasswordSubmitEvent}>
      {passwordFieldsConfig.map((field) => (
        <PasswordInput
          label={field.label}
          register={register}
          name={field.name}
          rules={passwordRules}
          error={errors[field.name]}
        />
      ))}

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
