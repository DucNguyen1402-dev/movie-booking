import { useParams } from "react-router-dom";

import { PencilLine } from "lucide-react";

import { useSyncLeaveConfirmation } from "@hooks/admin";
import { useUsersContext } from "@features/admin/users/contexts";
import {
  UserEditForm,
  UserProfileHeader,
} from "@features/admin/users/edit/components";
import { useEditActions, useEditForm } from "@features/admin/users/edit/hooks";
import { CancelButton, SaveButton } from "@components/admin/ui/buttons";
import { getAvatarInitial } from "@utils/admin";

const EditUser = () => {
  const { account } = useParams();

  const {
    usersStates: { users },
  } = useUsersContext();
  const targetUser = users.find((user) => user.taiKhoan === account) ?? {};

  const { register, handleSubmit, errors, initialUser, isDirty } = useEditForm({
    user: targetUser,
  });

  useSyncLeaveConfirmation(isDirty);

  const { onCancelEditClick, onConfirmEditClick } = useEditActions({
    handleSubmit,
    initialUser,
    isDirty,
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 p-8 text-slate-100">
      <div className="mx-auto space-y-8">
        <div className="flex items-center justify-center gap-2 text-slate-200">
          <PencilLine className="size-4" />
          <p className="mt-2 text-center">
            Thay đổi thông tin trong biểu mẫu để cập nhật thông tin người dùng.
          </p>
        </div>

        <div className="mx-auto max-w-lg rounded-2xl border border-slate-700 bg-slate-800 p-8 shadow-xl">
          <UserProfileHeader
            initial={getAvatarInitial(targetUser?.hoTen)}
            taiKhoan={targetUser?.taiKhoan}
            role={targetUser?.maLoaiNguoiDung}
          />

          <UserEditForm register={register} errors={errors} />

          <div className="mt-20 flex justify-end gap-4">
            <CancelButton surface="dark" onClick={onCancelEditClick}>
              Hủy
            </CancelButton>

            <SaveButton surface="dark" onClick={onConfirmEditClick}>
              Lưu thông tin
            </SaveButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
