import { deleteUser } from "@services/admin/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@contexts/admin/NotificationContext";
import { useLoading } from "@contexts/admin/LoadingSpinnerContext";
import { useModalContext } from "@contexts/admin/ModalContext";
import { MODAL_TYPES } from "@constants/admin/modalTypes";

export function useUserDeletion() {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });

  const modal = useModalContext();
  const { showLoading, hideLoading } = useLoading();
  const { notifActions } = useNotification();

  const handleDeleteUser = async (taiKhoan) => {
    modal.close();
    showLoading();

    try {
      await mutateAsync(taiKhoan);
      hideLoading();
      notifActions.showNotification({
        variant: "success",
        message: "Xóa tài khoản thành công",
      });
    } catch (error) {
      const message =
        error.response?.data?.content ??
        "Đã có lỗi xảy ra. Vui lòng thử lại sau.";

      hideLoading();
      notifActions.showNotification({
        variant: "error",
        message,
      });
    }
  };

  const onDeletionClick = (taiKhoan) =>
    modal.open({
      type: MODAL_TYPES.DELETE_USER,
      title: "Bạn có chắc muốn xóa người dùng này?",
      subtitle: "Dữ liệu người dùng sẽ bị xóa ra khỏi hệ thống",
      onConfirm: () => handleDeleteUser(taiKhoan),
    });

  return {
    onDeletionClick,
  };
}
