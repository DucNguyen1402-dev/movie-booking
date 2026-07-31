import { useCallback, useState } from "react";

import { modal, toast } from "@shared/overlays";

import { ENTITIES } from "@features/admin/shared/config";

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
        toaster.show(toast.config.success.delete(ENTITIES.user));
      } catch (error) {
        const message =
          error.response?.data?.content ??
          "Đã có lỗi xảy ra. Vui lòng thử lại sau.";
        toaster.show(toast.config.error(message));
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
