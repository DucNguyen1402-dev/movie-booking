import { useEffect } from "react";
import {userRoleLabel} from "@features/admin/users/constants"
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { PencilLine } from "lucide-react";
import { useUsers } from "@features/admin/users/hooks";
import { CancelButton, SaveButton } from "@components/admin/buttons";
import {
  UserProfileHeader,
  UserEditForm,
} from "@features/admin/users/edit/components";
import { useEditActions, useEditForm } from "@features/admin/users/edit/hooks";

export default function EditUser() {
  const { account } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: users = [], isPending } = useUsers();
  const targetUser = users.find((user) => user.taiKhoan === account) ?? {};

  const initial = targetUser?.hoTen?.charAt(0).toUpperCase() ?? "";

  const { register, handleSubmit, fields, errors, initialUser, isDirty } =
    useEditForm({
      user: targetUser,
    });

  useEffect(() => {
    navigate(".", {
      replace: true,
      state: {
        ...location.state,
        shouldConfirmLeave: isDirty,
      },
    });
  }, [isDirty]);

  const { onCancelEditClick, onConfirmEditClick } = useEditActions({
    handleSubmit,
    initialUser,
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 p-8 text-slate-100">
      <div className="mx-auto max-w-4xl space-y-5">
        <div className="flex items-center justify-center gap-3 text-slate-200">
          <PencilLine className="size-4" />
          <p className="mt-2 text-center">
            Thay đổi thông tin trong biểu mẫu để cập nhật thông tin người dùng.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-slate-800 p-8 shadow-xl">
          <UserProfileHeader
            initial={initial}
            taiKhoan={targetUser.taiKhoan}
            roleLabel={userRoleLabel[targetUser.maLoaiNguoiDung]}
          />

          <UserEditForm fields={fields} register={register} errors={errors} />

          <div className="mt-10 flex justify-end gap-4">
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
}
