import { deleteUser } from "@services/admin/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@contexts/admin/NotificationContext";
import { useLoadingContext } from "@contexts/admin/loading";
import { useModalContext } from "@contexts/admin/modal";
import { MODAL_TYPES } from "@constants/admin/modalTypes";
import { useState } from "react";

export function useUserDeletion() {
  const [deletingAccount, setDeletingAccount] = useState(null);

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });

  const modal = useModalContext();
  const { showLoading, hideLoading } = useLoadingContext();
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
    } finally {
      setDeletingAccount(null);
    }
  };

  const onDeletionClick = (taiKhoan) => {
    setDeletingAccount(taiKhoan);
    modal.open({
      type: MODAL_TYPES.DELETE_USER,
      title: "Bạn có chắc muốn xóa người dùng này ?",
      subtitle: "Dữ liệu người dùng sẽ bị xóa ra khỏi hệ thống",
      onConfirm: () => handleDeleteUser(taiKhoan),
      onCancel: () => {
        setDeletingAccount(null);
        modal.close();
      },
    });
  };

  return {
    onDeletionClick,
    deletingAccount,
  };
}
