import { MODAL_TYPES } from "@constants/admin/modalTypes";
import { MIN_LOADING_TIME } from "@constants/admin/loadingSpinner";
import { HIGHLIGHT_TYPES } from "@config/admin/userHighlights";
import { ensureMinDuration } from "@utils/admin/ensureMinDuration";
import { useLocation, useNavigate } from "react-router-dom";
import { useModalContext } from "@contexts/admin/ModalContext";
import { useNotification } from "@contexts/admin/NotificationContext";
import { useLoading } from "@contexts/admin/LoadingSpinnerContext";
import { createUser } from "@services/admin/api";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export function useUserFormActions({ handleSubmit }) {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
  const modal = useModalContext();
  const location = useLocation();
  const navigate = useNavigate();
  const history = location.state?.history ?? [];
  const previousPath = history.at(-1) ?? "/admin/users";
  const { notifActions } = useNotification();
  const { showLoading, hideLoading } = useLoading();

  const handleCancelAddUser = () => {
    modal.close();
    navigate(previousPath, { state: { history: history.slice(0, -1), } });
  };
  const onCancelAddUserClick = () =>
    modal.open({
      type: MODAL_TYPES.ADDING_USER,
      title: "Bạn có chắc muốn hủy?",
      subtitle: "Thông tin của bạn sẽ không được lưu",
      onConfirm: handleCancelAddUser,
    });

  const handleAddUser = async (data) => {
    modal.close();
    showLoading();
    const start = new Date();
    try {
      const content = await mutateAsync(data);

      ensureMinDuration(start, MIN_LOADING_TIME);
      hideLoading();

      navigate(previousPath, {
        state: {
          newAccount: content.taiKhoan,
          highlight: HIGHLIGHT_TYPES.ADD,
          notification: {
            variant: "success",
            message: "Add user successfully",
          },
          history,
        },
      });
    } catch (error) {
      modal.close();
      hideLoading();
      notifActions.showNotification({
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
      title: "Bạn có chắc chắn muốn tạo người dùng?",
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
