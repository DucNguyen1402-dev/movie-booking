import { useMemo, useState } from "react";

import { ENTITIES } from "@config/admin";
import { createDeleteModalContent } from "@helpers/admin/modal";

import { useModalContext, useNotificationContext } from "@contexts/admin";
import { MODAL_TYPES, NOTIFICATION_TYPES } from "@constants/admin";

import { useDeleteUser } from "./useDeleteUser";

export function useUserDeletion() {
  const [deletingAccount, setDeletingAccount] = useState(null);

  const { mutateAsync } = useDeleteUser();

  const modal = useModalContext();
  const { notificationActions } = useNotificationContext();

  const handleDeleteUser = useMemo(
    () => async (taiKhoan) => {
      try {
        await mutateAsync(taiKhoan);
        modal.close();
        notificationActions.show({
          variant: NOTIFICATION_TYPES.SUCCESS,
          message: "Xóa tài khoản thành công.",
        });
      } catch (error) {
        modal.close();
        const message =
          error.response?.data?.content ??
          "Đã có lỗi xảy ra. Vui lòng thử lại sau.";
        notificationActions.show({
          variant: NOTIFICATION_TYPES.ERROR,
          message,
        });
      } finally {
        setDeletingAccount(null);
      }
    },
    [modal, mutateAsync, notificationActions],
  );

  const onDeletionClick = useMemo(
    () => (taiKhoan) => {
      setDeletingAccount(taiKhoan);
      modal.open({
        type: MODAL_TYPES.DELETE,
        content: createDeleteModalContent(ENTITIES.user, taiKhoan),
        onConfirm: () => handleDeleteUser(taiKhoan),
        onCancel: () => {
          setDeletingAccount(null);
          modal.close();
        },
      });
    },
    [handleDeleteUser, modal],
  );

  return {
    onDeletionClick,
    deletingAccount,
  };
}
