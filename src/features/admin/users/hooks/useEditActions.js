import { useModalContext } from "@contexts/admin/modal";
import { MODAL_TYPES } from "@constants/admin/modalTypes";
import { useNavigate, useLocation } from "react-router-dom";
import { useLoadingContext } from "@contexts/admin/loading";
import { useNotification } from "@contexts/admin/NotificationContext";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateUser } from "@services/admin/api";
import { HIGHLIGHT_TYPES } from "@config/admin/userHighlights";
import { ensureMinDuration } from "@utils/admin/ensureMinDuration";
import { MIN_LOADING_TIME } from "@constants/admin/loadingSpinner";

export function useEditActions({ handleSubmit, initialUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  const history = location.state?.history ?? [];
  const previousPage = location.state?.previousPage ?? null;
  const previousPath = history.at(-1) ?? "/admin/users";

  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });

  const modal = useModalContext();
  const { showLoading, hideLoading } = useLoadingContext();
  const { notifActions } = useNotification();

  const handleCancelEdit = () => {
    modal.close();
    navigate(previousPath, {
      state: {
        history: history.slice(0, -1),
      },
    });
  };

  const onCancelEditClick = () =>
    modal.open({
      type: MODAL_TYPES.EDIT_USER,
      title: "Hủy thay đổi ?",
      subtitle: "Mọi thông tin của bạn sẽ không được lưu",
      onConfirm: handleCancelEdit,
    });

  const handleConfirmEdit = async (data) => {
    modal.close();

    showLoading();
    const hasFieldChange = Object.keys(initialUser).some(
      (key) => initialUser[key] !== data[key],
    );

    if (!hasFieldChange) {
      hideLoading();
      notifActions.showNotification({
        variant: "warning",
        message:
          "Không phát hiện dữ liệu thay đổi, vui lòng kiểm tra lại hoặc rời trang.",
      });
      return;
    }

    const start = new Date();

    try {
      await mutateAsync(data);
      await ensureMinDuration(start, MIN_LOADING_TIME);
      hideLoading();
      navigate(previousPath, {
        state: {
          account: data.taiKhoan,
          history: history.slice(0, -1),
          notification: {
            variant: "success",
            message: "Cập nhật thông tin người dùng thành công.",
          },
          highlight: HIGHLIGHT_TYPES.UPDATE,
          previousPage
        },
      });
    } catch (error) {
      hideLoading();
      const message =
        error.response?.data?.content ??
        "Đã có lỗi xảy ra, vui lòng thử lại sau.";
      notifActions.showNotification({
        variant: "error",
        message,
      });
    }
  };


  const onValid = (data) =>
    modal.open({
      type: MODAL_TYPES.EDIT_USER,
      title: "Lưu thay đổi ?",
      subtitle: "Thông tin của người dùng sẽ được thay đổi trong hệ thống",
      onConfirm: () => handleConfirmEdit(data),
    });

  const onConfirmEditClick = () => handleSubmit(onValid)();

  return {
    onCancelEditClick,
    onConfirmEditClick,
  };
}
