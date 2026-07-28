import { useLocation, useNavigate } from "react-router-dom";

import { ENTITIES } from "@config/admin";
import {
  createAddModalContent,
  createUnsavedChangesModalContent,
} from "@helpers/admin/modal";

import {
  useLoadingContext,
  useModalContext,
  useNotificationContext,
} from "@contexts/admin";
import { ensureMinDuration } from "@utils/admin";
import {
  MIN_LOADING_TIME,
  MODAL_TYPES,
  NOTIFICATION_TYPES,
  ROW_ACTION_TYPES,
} from "@constants/admin";

import { useUserCreation } from ".";

export function useAddActions({ handleSubmit }) {
  const location = useLocation();
  const navigate = useNavigate();
  const history = location.state?.history ?? [];
  const previousPath = history.at(-1) ?? "/admin/users";

  const { mutateAsync } = useUserCreation();

  const modal = useModalContext();

  const { notificationActions } = useNotificationContext();
  const { showLoading, hideLoading } = useLoadingContext();

  const handleCancelAddUser = () => {
    modal.close();
    navigate(previousPath, { state: { history: history.slice(0, -1) } });
  };
  const onCancelAddUserClick = () =>
    modal.open({
      type: MODAL_TYPES.UNSAVED_CHANGES,
      content: createUnsavedChangesModalContent(ENTITIES.user),
      onConfirm: handleCancelAddUser,
    });

  const handleAddUser = async (data) => {
    modal.close();
    showLoading();
    const start = new Date();
    try {
      const content = await mutateAsync(data);
      await ensureMinDuration(start, MIN_LOADING_TIME);
      hideLoading();

      navigate(previousPath, {
        state: {
          account: content.taiKhoan,
          highlight: ROW_ACTION_TYPES.ADD,
          notification: {
            variant: NOTIFICATION_TYPES.SUCCESS,
            message: "Người dùng đã được thêm thành công.",
          },
          history: history.slice(0, -1),
        },
      });
    } catch (error) {
      modal.close();
      hideLoading();
      notificationActions.show({
        variant: NOTIFICATION_TYPES.ERROR,
        message:
          error.response?.data?.content ??
          "Đã có lỗi xảy ra! vui lòng kiểm tra lại dữ liệu hoặc kết nối mạng",
      });
    }
  };

  const onValid = (data) =>
    modal.open({
      type: MODAL_TYPES.ADD,
      content: createAddModalContent(ENTITIES.user),
      onConfirm: () => handleAddUser(data),
    });

  const onInvalid = () => modal.close();

  const onAddUserClick = () => handleSubmit(onValid, onInvalid)();

  return {
    onCancelAddUserClick,
    onAddUserClick,
  };
}
