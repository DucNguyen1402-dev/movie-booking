import { userValidationRules } from "@features/admin/shared/config";
import { FormLabel, PasswordField } from "@shared/fields";
import { CancelButton, SaveButton } from "@shared/ui";

import { useSyncLeaveConfirmation } from "@hooks/admin";
import { useProfileContext } from "@features/admin/profile/contexts";

const passwordFieldsConfig = [
  { label: "Mật khẩu hiện tại", name: "matKhauHienTai" },
  { label: "Mật khẩu mới", name: "matKhauMoi" },
  { label: "Xác nhận mật khẩu mới", name: "xacNhanMatKhauMoi" },
];

const PasswordChangeForm = () => {
  const {
    form: { register, errors, onPasswordSubmitEvent, isDirty },
    profile: { onCancelPasswordChangeClick },
  } = useProfileContext();

  const { matKhau: passwordRules } = userValidationRules;

  useSyncLeaveConfirmation(isDirty);

  return (
    <form className="space-y-10" onSubmit={onPasswordSubmitEvent}>
      {passwordFieldsConfig.map((field) => (
        <div className="flex flex-col gap-3" key={field.name}>
          <FormLabel required={true} htmlFor={field.name}>
            {field.label}
          </FormLabel>
          <PasswordField
            {...register(field.name, passwordRules)}
            error={errors[field.name]?.message}
          />
        </div>
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
};

export default PasswordChangeForm;
