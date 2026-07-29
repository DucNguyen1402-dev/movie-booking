import { useLocation, useNavigate } from "react-router-dom";

import { ENTITIES } from "@config/admin";
import {
  createEditModalContent,
  createUnsavedChangesModalContent,
} from "@helpers/admin/modal";
import { runWithLoading } from "@shared/async";
import { loading } from "@shared/loading";

import { useModalContext, useNotificationContext } from "@contexts/admin";
import {
  MODAL_TYPES,
  NOTIFICATION_TYPES,
  ROW_ACTION_TYPES,
} from "@constants/admin";

import { useUserEdit } from "./useUserEdit";

export function useEditActions({ handleSubmit, initialUser, isDirty }) {
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

  const modal = useModalContext();
  const loader = loading.use();
  const { notificationActions } = useNotificationContext();
  const { mutateAsync } = useUserEdit();

  const onCancelEditClick = () => {
    if (!isDirty) {
      navigateBack();
      return;
    }

    modal.open({
      type: MODAL_TYPES.UNSAVED_CHANGES,
      content: createUnsavedChangesModalContent(ENTITIES.user),
      onConfirm: () => {
        modal.close();
        navigateBack();
      },
    });
  };

  const handleSubmitUpdatedUser = async (data) => {
    modal.close();
    const hasFieldChange = Object.keys(initialUser).some(
      (key) => initialUser[key] !== data[key],
    );

    if (!hasFieldChange) {
      notificationActions.show({
        variant: NOTIFICATION_TYPES.WARNING,
        message:
          "Không phát hiện dữ liệu thay đổi, vui lòng kiểm tra lại hoặc rời trang.",
      });
      return;
    }

    const submitUpdateUserTask = async () => mutateAsync(data);

    try {
      await runWithLoading(submitUpdateUserTask, loader);

      navigate(previousPath, {
        state: {
          account: data.taiKhoan,
          history: history.slice(0, -1),
          notificationState: {
            variant: NOTIFICATION_TYPES.SUCCESS,
            message: "Cập nhật thông tin người dùng thành công.",
          },
          highlight: ROW_ACTION_TYPES.UPDATE,
        },
      });
    } catch (error) {
      const message =
        error.response?.data?.content ??
        "Đã có lỗi xảy ra, vui lòng thử lại sau.";
      notificationActions.show({
        variant: "error",
        message,
      });
    }
  };

  const onValid = (data) =>
    modal.open({
      type: MODAL_TYPES.EDIT,
      content: createEditModalContent(ENTITIES.user),
      onConfirm: () => handleSubmitUpdatedUser(data),
    });

  const onConfirmEditClick = () => handleSubmit(onValid)();

  return {
    onCancelEditClick,
    onConfirmEditClick,
  };
}
