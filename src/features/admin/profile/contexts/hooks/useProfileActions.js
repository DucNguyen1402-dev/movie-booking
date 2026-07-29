import { useLocation, useNavigate } from "react-router-dom";

import { ENTITIES } from "@config/admin";
import {
  createChangePasswordModalContent,
  createEditModalContent,
  createUnsavedPasswordChangesModalContent,
} from "@helpers/admin/modal";
import { runWithLoading } from "@shared/async";
import { loading } from "@shared/loading";
import { toast, toastContent } from "@shared/toast";

import { useModalContext } from "@contexts/admin";
import { useUserInfor } from "@features/admin/users";
import { getCurrentUser } from "@utils/shared";
import { MODAL_TYPES } from "@constants/admin";

import { useUpdateUser } from ".";

export function useProfileActions({ handleSubmit, getValues, isDirty }) {
  const location = useLocation();
  const navigate = useNavigate();
  const history = location.state?.history ?? [];
  const previousPath = history.at(-1) ?? "admin/profile";

  const currentUser = getCurrentUser();

  const { data: loginedUser = [], isLoading } = useUserInfor(
    currentUser.taiKhoan,
  );

  const { mutateAsync } = useUpdateUser();

  const modal = useModalContext();
  const loader = loading.use();
  const toaster = toast.use();

  const handleCancelPasswordChange = () => {
    modal.close();
    navigate(previousPath, {
      state: {
        history: history.slice(0, -1),
      },
    });
  };

  const onCancelPasswordChangeClick = () => {
    if (isDirty) {
      modal.open({
        type: MODAL_TYPES.UNSAVED_CHANGES,
        content: createUnsavedPasswordChangesModalContent(),
        onConfirm: handleCancelPasswordChange,
      });
      return;
    }
    navigate(previousPath, {
      state: {
        history: history.slice(0, -1),
      },
    });
  };

  const submitProfileChange = async (data) => {
    modal.close();
    const payload = {
      maNhom: currentUser.maNhom,
      taiKhoan: data.taiKhoan,
      hoTen: data.hoTen,
      matKhau: data.matKhau,
      email: data.email,
      soDt: data.soDT,
      maLoaiNguoiDung: currentUser.maLoaiNguoiDung,
    };

    const changeProfileTask = async () => await mutateAsync(payload);

    try {
      await runWithLoading(changeProfileTask, loader);
      navigate(previousPath, {
        state: {
          history: history.slice(0, -1),
          toastState: toastContent.success.forupdate(ENTITIES.profile),
        },
      });
    } catch (error) {
      const message =
        error?.response?.data?.content ??
        "Đã có lỗi hệ thống xảy ra, vui lòng thử lại sau.";

      toaster.show(toastContent.error.forUpdate(message));
    }
  };

  const submitPasswordChange = async (data) => {
    modal.close();

    const submitChangedPasswordTask = async () => {
      const { matKhau, matKhauHienTai, matKhauMoi, xacNhanMatKhauMoi } =
        getValues();

      if (matKhau !== matKhauHienTai) {
        toaster.show(
          toastContent.error.forUpdate("Mật khẩu hiện tại không chính xác"),
        );
        return;
      }

      if (matKhauMoi !== xacNhanMatKhauMoi) {
        toaster.show(
          toastContent.error.forUpdate("Mật khẩu mới không giống nhau"),
        );
        return;
      }

      try {
        const payload = {
          maNhom: currentUser.maNhom,
          taiKhoan: data.taiKhoan,
          hoTen: data.hoTen,
          matKhau: matKhauMoi,
          email: data.email,
          soDt: data.soDT,
          maLoaiNguoiDung: currentUser.maLoaiNguoiDung,
        };

        await mutateAsync(payload);

        navigate(previousPath, {
          state: {
            history: history.slice(0, -1),
            toastState: toastContent.success.forChangePassword(),
          },
        });
      } catch (error) {
        const message =
          error?.response?.data?.content ??
          "Đã có lỗi hệ thống xảy ra, vui lòng thử lại sau.";

        toaster.show(toastContent.error.forChangePassword(message));
      }
    };

    await runWithLoading(submitChangedPasswordTask, loader);
  };

  const handleChangeProfile = (data) =>
    modal.open({
      type: MODAL_TYPES.EDIT,
      content: createEditModalContent(ENTITIES.profile),
      onConfirm: () => submitProfileChange(data),
    });

  const handleChangePassword = (data) =>
    modal.open({
      type: MODAL_TYPES.EDIT,
      content: createChangePasswordModalContent(loginedUser.taiKhoan),
      onConfirm: () => submitPasswordChange(data),
    });

  const onValid = (data, action) => {
    switch (action) {
      case "changeProfile":
        handleChangeProfile(data);
        break;

      case "changePassword":
        handleChangePassword(data);
        break;
    }
  };

  const onSubmitEvent = (e) => {
    e.preventDefault();

    handleSubmit((data) => onValid(data, "changeProfile"))();
  };

  const onPasswordSubmitEvent = (e) => {
    e.preventDefault();
    handleSubmit((data) => onValid(data, "changePassword"))();
  };

  return {
    isLoading,
    onCancelPasswordChangeClick,
    onPasswordSubmitEvent,
    onSubmitEvent,
    loginedUser,
  };
}
