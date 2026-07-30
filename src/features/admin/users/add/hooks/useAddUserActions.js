import { useLocation, useNavigate } from "react-router-dom";

import { runWithLoading } from "@shared/async";
import { loading, modal, toast } from "@shared/overlays";
import { ROW_ACTION_TYPES } from "@shared/table";

import { ENTITIES } from "@features/admin/shared/config";

import { useUserCreation } from ".";

export function useAddUserActions({ handleSubmit }) {
  const location = useLocation();
  const navigate = useNavigate();
  const history = location.state?.history ?? [];
  const previousPath = history.at(-1) ?? "/admin/users";

  const { mutateAsync } = useUserCreation();

  const modalApi = modal.use();

  const toaster = toast.use();
  const loader = loading.use();

  const handleCancelAddUser = () =>
    navigate(previousPath, { state: { history: history.slice(0, -1) } });
  const onCancelAddUserClick = () =>
    modalApi.open({
      ...modal.config.unsavedChanges(ENTITIES.user),
      onConfirm: handleCancelAddUser,
    });

  const handleSubmitNewUser = async (data) => {
    const submitNewUserTask = async () => await mutateAsync(data);

    try {
      const content = await runWithLoading(submitNewUserTask, loader);

      navigate(previousPath, {
        state: {
          account: content.taiKhoan,
          highlight: ROW_ACTION_TYPES.ADD,
          toastState: toast.config.success.add(ENTITIES.user),
          history: history.slice(0, -1),
        },
      });
    } catch (error) {
      const message =
        error?.response?.data?.content ??
        "Đã có lỗi xảy ra, vui lòng thử lại sau.";
      toaster.show(toast.config.error(message));
    }
  };

  const onValid = (data) =>
    modalApi.open({
      ...modal.config.add(ENTITIES.user),
      onConfirm: () => handleSubmitNewUser(data),
    });

  const onAddUserClick = () => handleSubmit(onValid)();

  return {
    onCancelAddUserClick,
    onAddUserClick,
  };
}
