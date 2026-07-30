import { useLocation, useNavigate } from "react-router-dom";

import { ENTITIES } from "@config/admin";
import { runWithLoading } from "@shared/async";
import { loading, modal } from "@shared/overlays";
import { toast, toastContent } from "@shared/toast";

import { useUserInfor } from "@features/admin/users";
import { getCurrentUser } from "@utils/shared";

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

  const modalApi = modal.use();
  const loader = loading.use();
  const toaster = toast.use();

  const handleCancelPasswordChange = () =>
    navigate(previousPath, {
      state: {
        history: history.slice(0, -1),
      },
    });
  const onCancelPasswordChangeClick = () => {
    if (isDirty) {
      modalApi.open({
        ...modal.config.unsavedPasswordChange(),
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
          toastState: toastContent.success.update(ENTITIES.profile),
        },
      });
    } catch (error) {
      const message =
        error?.response?.data?.content ??
        "Đã có lỗi hệ thống xảy ra, vui lòng thử lại sau.";

      toaster.show(toastContent.error(message));
    }
  };

  const submitPasswordChange = async (data) => {
    const submitChangedPasswordTask = async () => {
      const { matKhau, matKhauHienTai, matKhauMoi, xacNhanMatKhauMoi } =
        getValues();

      if (matKhau !== matKhauHienTai) {
        toaster.show(toastContent.error("Mật khẩu hiện tại không chính xác"));
        return;
      }

      if (matKhauMoi !== xacNhanMatKhauMoi) {
        toaster.show(toastContent.error("Mật khẩu mới không giống nhau"));
        return;
      }

      if (matKhauMoi === matKhau) {
        toaster.show(
          toastContent.error("Mật khẩu mới không được trùng với mật khẩu cũ."),
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
            toastState: toastContent.success.changePassword(),
          },
        });
      } catch (error) {
        const message =
          error?.response?.data?.content ??
          "Đã có lỗi hệ thống xảy ra, vui lòng thử lại sau.";

        toaster.show(toastContent.error(message));
      }
    };

    await runWithLoading(submitChangedPasswordTask, loader);
  };

  const handleChangeProfile = (data) =>
    modalApi.open({
      ...modal.config.edit(ENTITIES.profile),
      onConfirm: () => submitProfileChange(data),
    });

  const handleChangePassword = (data) =>
    modalApi.open({
      ...modal.config.passwordChange(loginedUser.taiKhoan),
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
