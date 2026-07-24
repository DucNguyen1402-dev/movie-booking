import { useLocation, useNavigate } from "react-router-dom";

import { useLoadingContext } from "@contexts/admin";
import { useModalContext } from "@contexts/admin";
import { useNotificationContext } from "@contexts/admin/notification";
import { useUserInfor } from "@features/admin/users";
import { getCurrentUser } from "@utils/shared";
import { MODAL_TYPES } from "@constants/admin";

import { useProfileEffect } from "./useProfileEffect";
import { useProfileForm } from "./useProfileForm";
import { useUpdateUser } from "./useUpdateUser";

export function useProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const history = location.state?.history ?? [];
  const previousPath = history.at(-1) ?? "admin/profile";

  const currentUser = getCurrentUser();

  const { data: loginedUser, isLoading } = useUserInfor(currentUser.taiKhoan);

  const { mutateAsync } = useUpdateUser();

  const modal = useModalContext();
  const { showLoading, hideLoading } = useLoadingContext();
  const { notificationActions } = useNotificationContext();

  const handleCancelPasswordChange = () => {
    modal.close();
    navigate(previousPath, {
      state: {
        history: history.slice(0, -1),
      },
    });
  };

  const { register, handleSubmit, getValues, reset, errors, isDirty } =
    useProfileForm();

  useProfileEffect({ reset, loginedUser });

  const onCancelPasswordChangeClick = () => {
    if (isDirty) {
      modal.open({
        type: MODAL_TYPES.SAVE_PROFILE,
        title: "Hủy các thay đổi?",
        subtitle: "Những thay đổi chưa lưu sẽ bị mất.",
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
    showLoading();

    try {
      const payload = {
        maNhom: currentUser.maNhom,
        taiKhoan: data.taiKhoan,
        hoTen: data.hoTen,
        matKhau: data.matKhau,
        email: data.email,
        soDt: data.soDT,
        maLoaiNguoiDung: currentUser.maLoaiNguoiDung,
      };
      await mutateAsync(payload);
      hideLoading();
      navigate(previousPath, {
        state: {
          history: history.slice(0, -1),
          notification: {
            variant: "success",
            message: "Thông tin của bạn đã được cập nhật thành công",
          },
        },
      });
    } catch (error) {
      hideLoading();

      const message =
        error?.response?.data?.content ??
        "Đã có lỗi hệ thống xảy ra, vui lòng thử lại sau.";

      notificationActions.show({
        variant: "error",
        message,
      });
    }
  };

  const submitPasswordChange = async (data) => {
    modal.close();
    showLoading();

    const { matKhau, matKhauHienTai, matKhauMoi, xacNhanMatKhauMoi } =
      getValues();

    if (matKhau !== matKhauHienTai) {
      hideLoading();
      notificationActions.show({
        variant: "error",
        message: "Mật khẩu hiện tại không chính xác!",
      });
      return;
    }

    if (matKhauMoi !== xacNhanMatKhauMoi) {
      hideLoading();
      notificationActions.show({
        variant: "error",
        message: "Mật khẩu mới không giống nhau",
      });
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
      hideLoading();
      navigate(previousPath, {
        state: {
          history: history.slice(0, -1),
          notification: {
            variant: "success",
            message: "Mật khẩu của bạn đã được thay đổi thành công.",
          },
        },
      });
    } catch (error) {
      hideLoading();
      const message =
        error?.response?.data?.content ??
        "Đã có lỗi hệ thống xảy ra, vui lòng thử lại sau.";

      notificationActions.show({
        variant: "error",
        message,
      });
    }
  };

  const handleChangeProfile = (data) =>
    modal.open({
      type: MODAL_TYPES.SAVE_PROFILE,
      title: "Xác nhận lưu thay đổi.",
      subtitle: "Thông tin tài khoản của bạn sẽ được cập nhật trên hệ thống.",
      onConfirm: () => submitProfileChange(data),
    });

  const handleChangePassword = (data) =>
    modal.open({
      type: MODAL_TYPES.SAVE_PROFILE,
      title: "Xác nhận đổi mật khẩu",
      subtitle: "Mật khẩu của bạn sẽ được cập nhật trên hệ thống.",
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
    form: { register, errors, isDirty, onSubmitEvent, onPasswordSubmitEvent },

    profile: {
      isLoading,
      onCancelPasswordChangeClick,
      loginedUser,
    },
  };
}
