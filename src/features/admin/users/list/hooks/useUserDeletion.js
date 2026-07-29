import { useMemo, useState } from "react";

import { ENTITIES } from "@config/admin";
import { createDeleteModalContent } from "@helpers/admin/modal";
import { toast, toastContent } from "@shared/toast";

import { useModalContext } from "@contexts/admin";
import { MODAL_TYPES } from "@constants/admin";

import { useDeleteUser } from "./useDeleteUser";

export function useUserDeletion() {
  const [deletingAccount, setDeletingAccount] = useState(null);

  const { mutateAsync } = useDeleteUser();

  const modal = useModalContext();
  const toaster = toast.use();

  const handleDeleteUser = useMemo(
    () => async (taiKhoan) => {
      try {
        await mutateAsync(taiKhoan);
        modal.close();
        toaster.show(toastContent.success.forDelete(ENTITIES.user));
      } catch (error) {
        modal.close();
        const message =
          error.response?.data?.content ??
          "Đã có lỗi xảy ra. Vui lòng thử lại sau.";
        toaster.show(toastContent.error.forDelete(message));
      } finally {
        setDeletingAccount(null);
      }
    },
    [modal, mutateAsync, toaster],
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
