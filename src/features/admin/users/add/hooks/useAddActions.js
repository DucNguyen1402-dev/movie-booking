import { useLocation, useNavigate } from "react-router-dom";

import { ENTITIES } from "@config/admin";
import {
  createAddModalContent,
  createUnsavedChangesModalContent,
} from "@helpers/admin/modal";
import { runWithLoading } from "@shared/async";
import { loading } from "@shared/loading";
import { toast, toastContent } from "@shared/toast";

import { useModalContext } from "@contexts/admin";
import { MODAL_TYPES, ROW_ACTION_TYPES } from "@constants/admin";

import { useUserCreation } from ".";

export function useAddActions({ handleSubmit }) {
  const location = useLocation();
  const navigate = useNavigate();
  const history = location.state?.history ?? [];
  const previousPath = history.at(-1) ?? "/admin/users";

  const { mutateAsync } = useUserCreation();

  const modal = useModalContext();

  const toaster = toast.use();
  const loader = loading.use();

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

  const handleSubmitNewUser = async (data) => {
    modal.close();

    const submitNewUserTask = async () => await mutateAsync(data);

    try {
      const content = await runWithLoading(submitNewUserTask, loader);

      navigate(previousPath, {
        state: {
          account: content.taiKhoan,
          highlight: ROW_ACTION_TYPES.ADD,
          toastState: toastContent.success.forAdd(ENTITIES.user),
          history: history.slice(0, -1),
        },
      });
    } catch (error) {
      const message =
        error?.response?.data?.content ??
        "Đã có lỗi xảy ra, vui lòng thử lại sau.";
      toaster.show(toastContent.error.forAdd(message));
    }
  };

  const onValid = (data) =>
    modal.open({
      type: MODAL_TYPES.ADD,
      content: createAddModalContent(ENTITIES.user),
      onConfirm: () => handleSubmitNewUser(data),
    });

  const onInvalid = () => modal.close();

  const onAddUserClick = () => handleSubmit(onValid, onInvalid)();

  return {
    onCancelAddUserClick,
    onAddUserClick,
  };
}
