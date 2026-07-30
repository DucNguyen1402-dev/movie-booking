import { useLocation, useNavigate } from "react-router-dom";

import { runWithLoading } from "@shared/async";
import { loading, modal, toast } from "@shared/overlays";
import { ROW_ACTION_TYPES } from "@shared/table";

import { ENTITIES } from "@features/admin/shared/config";

import { useEditUser } from "./useEditUser";

export function useEditUserActions({ handleSubmit, initialUser, isDirty }) {
  const navigate = useNavigate();
  const location = useLocation();
  const history = location.state?.history ?? [];
  const previousPath = history.at(-1) ?? "/admin/users";
  const navigateBack = () => {
    navigate(previousPath, {
      state: {
        history: history.slice(0, -1),
      },
    });
  };

  const modalApi = modal.use();
  const loader = loading.use();
  const toaster = toast.use();
  const { mutateAsync } = useEditUser();

  const onCancelEditClick = () => {
    if (!isDirty) {
      navigateBack();
      return;
    }

    modalApi.open({
      ...modal.config.unsavedChanges(ENTITIES.user),
      onConfirm: navigateBack,
    });
  };

  const handleSubmitUpdatedUser = async (data) => {
    const hasFieldChange = Object.keys(initialUser).some(
      (key) => initialUser[key] !== data[key],
    );

    if (!hasFieldChange) {
      toaster.show(
        toast.config.warning(
          "Không phát hiện dữ liệu thay đổi, vui lòng kiểm tra lại hoặc rời trang.",
        ),
      );
      return;
    }

    const submitUpdateUserTask = async () => mutateAsync(data);

    try {
      await runWithLoading(submitUpdateUserTask, loader);

      navigate(previousPath, {
        state: {
          account: data.taiKhoan,
          history: history.slice(0, -1),
          toastState: toast.config.success.update(ENTITIES.user),
          highlight: ROW_ACTION_TYPES.UPDATE,
        },
      });
    } catch (error) {
      const message =
        error.response?.data?.content ??
        "Đã có lỗi xảy ra, vui lòng thử lại sau.";
      toaster.show(toast.config.error(message));
    }
  };

  const onValid = (data) =>
    modalApi.open({
      ...modal.config.edit(ENTITIES.user),
      onConfirm: () => handleSubmitUpdatedUser(data),
    });

  const onConfirmEditClick = () => handleSubmit(onValid)();

  return {
    onCancelEditClick,
    onConfirmEditClick,
  };
}
