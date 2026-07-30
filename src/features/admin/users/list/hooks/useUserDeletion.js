import { useCallback, useState } from "react";

import { ENTITIES } from "@config/admin";
import { modal } from "@shared/overlays";
import { toast, toastContent } from "@shared/toast";

import { useDeleteUser } from "./useDeleteUser";

export function useUserDeletion() {
  const [deletingAccount, setDeletingAccount] = useState(null);

  const { mutateAsync } = useDeleteUser();

  const modalApi = modal.use();
  const toaster = toast.use();

  const handleDeleteUser = useCallback(
    async (taiKhoan) => {
      try {
        await mutateAsync(taiKhoan);
        modalApi.close();
        toaster.show(toastContent.success.delete(ENTITIES.user));
      } catch (error) {
        const message =
          error.response?.data?.content ??
          "Đã có lỗi xảy ra. Vui lòng thử lại sau.";
        toaster.show(toastContent.error(message));
      } finally {
        setDeletingAccount(null);
      }
    },
    [modalApi, mutateAsync, toaster],
  );

  const onDeletionClick = useCallback(
    (taiKhoan) => {
      setDeletingAccount(taiKhoan);
      modalApi.open({
        ...modal.config.delete(ENTITIES.user, taiKhoan),
        onConfirm: () => handleDeleteUser(taiKhoan),
        onCancel: () => setDeletingAccount(null),
      });
    },
    [handleDeleteUser, modalApi],
  );

  return {
    onDeletionClick,
    deletingAccount,
  };
}
