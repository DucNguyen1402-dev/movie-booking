import { userValidationRules } from "@config/admin";

import { useSyncLeaveConfirmation } from "@hooks/admin";
import { useProfileContext } from "@features/admin/profile/contexts";
import { createProfileFields } from "@features/admin/profile/edit/utils";
import { SaveButton } from "@components/admin/ui/buttons";
import { FormLabel, Input } from "@components/admin/ui/form";

const ProfileForm = () => {
  const {
    form: { register, errors, isDirty, onSubmitEvent },
  } = useProfileContext();
  const profileFields = createProfileFields({ errors });

  useSyncLeaveConfirmation(isDirty);

  return (
    <form onSubmit={onSubmitEvent} className="space-y-10">
      {profileFields.map(({ required, ...field }) => (
        <div className="flex flex-col gap-4" key={field.name}>
          <FormLabel
            htmlFor={field.name}
            required={required}
            className="self-start text-xs"
          >
            {field.label}
          </FormLabel>
          <Input
            {...field}
            {...register(field.name, userValidationRules[field.name])}
            error={errors[field.name]?.message}
          />
        </div>
      ))}

      <div className="mt-16 flex justify-end">
        <SaveButton type="submit" surface="dark">
          Lưu thông tin
        </SaveButton>
      </div>
    </form>
  );
};

export default ProfileForm;
