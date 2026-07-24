import { userValidationRules } from "@config/admin";

import { useSyncLeaveConfirmation } from "@hooks/admin";
import { useProfileContext } from "@features/admin/profile/contexts";
import { createProfileFields } from "@features/admin/profile/edit/utils";
import { Input, SaveButton } from "@components/admin";

export default function ProfileForm() {
  const {
    form: { register, errors, isDirty, onSubmitEvent },
  } = useProfileContext();
  const profileFields = createProfileFields({ errors });

  useSyncLeaveConfirmation(isDirty);

  return (
    <form onSubmit={onSubmitEvent} className="space-y-5">
      {profileFields.map((field) => (
        <Input
          key={field.name}
          register={register}
          {...field}
          rules={userValidationRules[field.name]}
          error={errors[field.name]}
        />
      ))}

      <div className="mt-16 flex justify-end">
        <SaveButton type="submit">Lưu thông tin</SaveButton>
      </div>
    </form>
  );
}
