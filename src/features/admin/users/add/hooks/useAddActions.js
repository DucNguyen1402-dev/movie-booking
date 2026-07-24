import { useLocation, useNavigate } from "react-router-dom";

import { HIGHLIGHT_TYPES } from "@config/admin";

import {
  useLoadingContext,
  useModalContext,
  useNotificationContext,
} from "@contexts/admin";
import { ensureMinDuration } from "@utils/admin";
import { MIN_LOADING_TIME, MODAL_TYPES } from "@constants/admin";

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
      type: MODAL_TYPES.ADDING_USER,
      title: "Bạn có chắc muốn hủy ?",
      subtitle: "Thông tin của bạn sẽ không được lưu",
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
          highlight: HIGHLIGHT_TYPES.ADD,
          notification: {
            variant: "success",
            message: "Add user successfully",
          },
          history: history.slice(0, -1),
        },
      });
    } catch (error) {
      modal.close();
      hideLoading();
      notificationActions.show({
        variant: "error",
        message:
          error.response?.data?.content ??
          "Đã có lỗi xảy ra! vui lòng kiểm tra lại dữ liệu hoặc kết nối mạng",
      });
    }
  };

  const onValid = (data) =>
    modal.open({
      type: MODAL_TYPES.ADDING_USER,
      title: "Bạn có chắc chắn muốn tạo người dùng ?",
      subtitle: "Thông tin sẽ được lưu để tạo người dùng mới.",
      onConfirm: () => handleAddUser(data),
    });

  const onInvalid = () => modal.close();

  const onAddUserClick = () => handleSubmit(onValid, onInvalid)();

  return {
    onCancelAddUserClick,
    onAddUserClick,
  };
}
